using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceHostService.Utility
{
    class LogManager
    {     
        const string SubDirectoryTrace = "TRACE";
        const string SubDirectoryError = "ERROR";
        //const string DefaultRootDirectory = "C:\\Program Files\\DeviceCommunicationServiceHost\\DeviceHostServiceLog\\";
        const string DefaultRootDirectory = "C:\\Program Files\\CMSLog\\";
        
        public string CreateFilePathWithDirectoryDetails(bool IsTrace) 
        {
            string logFileName = string.Empty;
            try
            {
                string strRootDirectory = Convert.ToString(ConfigurationManager.AppSettings["LogDirectory"]);
                if (string.IsNullOrEmpty(strRootDirectory))
                {
                    strRootDirectory = DefaultRootDirectory;
                }
                if (IsTrace == false)
                {
                    strRootDirectory = strRootDirectory + "\\" + SubDirectoryError + "\\";
                }
                else if (IsTrace == true)
                {
                    strRootDirectory = strRootDirectory + "\\" + SubDirectoryTrace + "\\";
                }
                DirectoryInfo objDirectoryInfo = new DirectoryInfo(strRootDirectory);
                if (!objDirectoryInfo.Exists)
                {
                    objDirectoryInfo.Create();
                }            
                logFileName = objDirectoryInfo.FullName + string.Format("{0:dd-MMMM-yyyy}", DateTime.Now) + ".txt";
                return logFileName;
            }
            catch 
            {
                return logFileName;
            }          
        }
        
        public static void SaveLoggerError(string strError, string pageName)
        {        
            bool EnableErrorLog = true;
            //if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["EnableErrorLog"]))
            //{
            //    string ErrorLogKeyValue = ConfigurationManager.AppSettings["EnableErrorLog"].ToLower();
            //    if (ErrorLogKeyValue == "true" || ErrorLogKeyValue == "false")
            //    {
            //        EnableErrorLog = Convert.ToBoolean(ErrorLogKeyValue);
            //    }
            //}
            if (EnableErrorLog)
            {
                string fileName = (new LogManager()).CreateFilePathWithDirectoryDetails(false);
                StreamWriter objWrite = null;
                StringBuilder sbContentFormat = new StringBuilder();
                sbContentFormat.Append("======================= ");
                sbContentFormat.Append(pageName + " ::");
                sbContentFormat.Append(string.Format("{0:dd-MMMM-yyyy hh:mm:ss tt}", DateTime.Now));
                sbContentFormat.AppendLine(" =======================");
                sbContentFormat.AppendLine(strError);
                sbContentFormat.Append("==============================================");
                sbContentFormat.AppendLine("==============================================");
                using (objWrite = new StreamWriter(fileName, true, Encoding.UTF8))
                {
                    objWrite.WriteLine(sbContentFormat.ToString());
                }
            }
        }

        public static void SaveLoggerTrace(StringBuilder strTrace, string pageName, string methodName)  
        {
            bool EnableTracing = false;
            if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["EnableTracing"]))
            {
                string tracingKeyValue = ConfigurationManager.AppSettings["EnableTracing"].ToLower();
                if (tracingKeyValue == "true" || tracingKeyValue == "false")
                {
                    EnableTracing = Convert.ToBoolean(tracingKeyValue);
                }
            }
            if (EnableTracing)
            {
                string fileName = (new LogManager()).CreateFilePathWithDirectoryDetails(true);
                StreamWriter objWrite = null;
                StringBuilder sbContentFormat = new StringBuilder();
                sbContentFormat.AppendLine("==============================================");
                sbContentFormat.AppendLine("Page Name: " + pageName);
                sbContentFormat.AppendLine("Method Name: " + methodName);     
                sbContentFormat.AppendLine(strTrace.ToString());
                sbContentFormat.AppendLine("==============================================");
                using (objWrite = new StreamWriter(fileName, true, Encoding.UTF8))
                {
                    objWrite.WriteLine(sbContentFormat.ToString());
                }
            }
        }
    } 
}
