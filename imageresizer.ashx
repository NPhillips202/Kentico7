<%@ WebHandler Language="C#" Class="ImageResizer" %>

using System;
using System.IO;
using System.Web;
using System.Drawing;
using ImageProcessor;
using System.Configuration;
using ImageProcessor.Imaging;
using ImageProcessor.Imaging.Formats;
//using MimeTypes;

public class ImageResizer : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        //context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");        

        string maxsidesize = context.Request.QueryString["maxsidesize"];
        string sideSizeParameter = string.IsNullOrEmpty(maxsidesize) ? "0" : maxsidesize;
        string imagePath = context.Request.QueryString["resizingPath"] ?? "";        
        int maximagesize = 0;
        if (!string.IsNullOrEmpty(imagePath))
        {
            string cacheMaxAge = ConfigurationManager.AppSettings["Cache-max-age"];
            cacheMaxAge = string.IsNullOrEmpty(cacheMaxAge) ? "0": cacheMaxAge;

            string cacheControl = string.Format("max-age={0}", cacheMaxAge);
            //Uri amazonEndPoint = new Uri(ConfigurationManager.AppSettings["CMSAmazonEndPoint"]);
            //Uri amazonEndPoint = new Ur(ConfigurationManager.AppSettings["CMSBucketAmazonEndPoint"]);
            string amazonBucketEndPoint = string.Format("{0}{1}.{2}", "https://", ConfigurationManager.AppSettings["CMSAmazonBucketName"], "s3.amazonaws.com");
            Uri amazonEndPoint = new Uri(amazonBucketEndPoint);
            int querystringPos = imagePath.IndexOf("?");
            
            if (querystringPos > 0)
                imagePath = imagePath.Substring(0, querystringPos);
            
            Uri path = new Uri(amazonEndPoint, imagePath);
                        
            //string path = string.Format("{0}/{1}", amazonEndPoint, imagePath);
            //string mimeType = MimeTypeMap.GetMimeType(path);
            string extension = Path.GetExtension(path.ToString());
            if (int.TryParse(sideSizeParameter, out maximagesize))
            {
                //path = string.Format("{0}/{1}",amazonEndPoint,path);
                byte[] photoBytes = new System.Net.WebClient().DownloadData(path);
                //byte[] photoBytes = File.ReadAllBytes(path);

                // Format is automatically detected though can be changed.
                ImageProcessor.Imaging.Formats.ISupportedImageFormat format = new JpegFormat { Quality = 70 };

                //Size size = new Size
                ResizeLayer resizeLayer = new ResizeLayer(new Size(maximagesize, maximagesize));                
                resizeLayer.Upscale = false;
                resizeLayer.ResizeMode = ResizeMode.Max;                
                
                using (MemoryStream inStream = new MemoryStream(photoBytes))
                {
                    using (MemoryStream outStream = new MemoryStream())
                    {
                        // Initialize the ImageFactory using the overload to preserve EXIF metadata.
                        using (ImageFactory imageFactory = new ImageFactory(preserveExifData: true))
                        {
                            // Load, resize, set the format and quality and save an image.
                            imageFactory.Load(inStream)
                                        .Resize(resizeLayer)                                        
                                        .Format(format)                                        
                                        .Save(outStream);
                        }
                        // Do something with the stream.
                        context.Response.ContentType = string.Format("image/{0}", extension.Replace(".", ""));
                        context.Response.AppendHeader("Cache-Control", cacheControl);
                        context.Response.BinaryWrite(outStream.ToArray());

                        //var sr = new StreamReader(outStream);
                        //var myStr = sr.ReadToEnd();
                        //context.Response.Write(myStr);
                    }
                }
            }
            //context.Response.ContentType = string.Format("image/{0}", extension.Replace(".", ""));
            //context.Response.BinaryWrite(outStream.ToArray());
            //context.Response.ContentType = MimeTypeMap.GetMimeType(path); //string.Format("image/{0}", extension.Replace(".", ""));
            //context.Response.WriteFile(path);
        }
    }
    
    public bool IsReusable {
        get {
            return false;
        }
    }

}