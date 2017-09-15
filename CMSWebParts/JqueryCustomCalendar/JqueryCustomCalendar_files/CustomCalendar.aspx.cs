using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Data.SqlClient;
using System.Data;
//using CMS.DataEngine;

public partial class CMSWebParts_CustomCalendar_CustomCalendar : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    }
//    [WebMethod]
//    public static List<Events> GetJsonData()
//    {
//        //string conStr = ConnectionHelper.GetConnectionString("CMSConnectionString");
//        string conStr = @"Data Source=CHETUIWK572\MSSQL2K8;Initial Catalog=Kentico;Integrated Security=True;User ID=sa1;Password=chetu@123";
//        SqlConnection cn = new SqlConnection(conStr);

//        SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM CONTENT_BookingEvent", cn);
//        DataSet ds = new DataSet();
//        da.Fill(ds);

//        var myData = ds.Tables[0].AsEnumerable().Select(r => new Events
//        {
//            id = r.Field<int>("BookingEventID"),
//            title = r.Field<string>("EventName"),
//            start = r.Field<DateTime?>("EventDate").ToString(),
//            end = r.Field<DateTime?>("EventEndDate").ToString(),
//            url = r.Field<string>("EventLocation"),
//            eventsummary = r.Field<string>("EventSummary"),
//            eventdetails = r.Field<string>("EventDetails"),
//            weekday = r.Field<int?>("Weekday"),
//            repeats = r.Field<int?>("Repeats"),
//            repeatfrequency = r.Field<int?>("RepeatFrequency")
//        });
//        var list = myData.ToList();

//        var listWeek = list.Where(e => e.repeats.Equals(1) && e.repeatfrequency.Equals(7)).ToList();
//        //var listMonth = list.Where(e => e.repeats.Equals(1) && e.repeatfrequency.Equals(30)).ToList();
//        var listDaily = list.Where(e => e.repeats.Equals(1) && e.repeatfrequency.Equals(1)).ToList();
//        Events eWeek = null;
//        foreach (Events item in listWeek)
//        {
//            for (DateTime i = Convert.ToDateTime(item.start); i < Convert.ToDateTime(item.end); i = i.AddDays(7))
//            {
//                eWeek = new Events();
//                eWeek.start = Convert.ToString(i);
//                eWeek.title = item.title;
//                eWeek.url = item.url;
//                eWeek.end = Convert.ToString(i);
//                eWeek.eventsummary = item.eventsummary;
//                eWeek.eventdetails = item.eventdetails;
//                list.Add(eWeek);
//            }
//            list.Remove(item);
//        }

//        foreach (Events item in listDaily)
//        {
//            for (DateTime i = Convert.ToDateTime(item.start); i < Convert.ToDateTime(item.end); i = i.AddDays(1))
//            {
//                eWeek = new Events();
//                eWeek.start = Convert.ToString(i);
//                eWeek.title = item.title;
//                eWeek.url = item.url;
//                eWeek.end = Convert.ToString(i);
//                eWeek.eventsummary = item.eventsummary;
//                eWeek.eventdetails = item.eventdetails;
//                list.Add(eWeek);
//            }
//            list.Remove(item);
//        }

//        return list;
//    }
//}


//public class Events
//{
//    public int id { get; set; }
//    public string title { get; set; }
//    public string eventsummary { get; set; }
//    public string eventdetails { get; set; }
//    public string url { get; set; }
//    public string start { get; set; }
//    public string end { get; set; }
//    public int? weekday { get; set; }
//    public int? repeats { get; set; }
//    public int? repeatfrequency { get; set; }

//}