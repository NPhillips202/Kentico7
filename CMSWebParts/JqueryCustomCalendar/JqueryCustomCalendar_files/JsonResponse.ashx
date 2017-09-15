<%@ WebHandler Language="C#" Class="JsonResponse" %>

using System;
using System.Web;
using System.Collections;
using System.Collections.Generic;
using System.Web.SessionState;
using System.Data;
using System.Linq;
using CMS.DataEngine;

using System.IO;
using System.Text;
using System.Configuration;
public class JsonResponse : IHttpHandler, IRequiresSessionState
{
    //LogManager trance = new LogManager();

    private string convertIntoString(Events cevent)
    {

        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("start method convertIntoString(Events cevent)", "Handler", "convertIntoString(Events cevent)");

        return "{" +
        "\"LegendGroupColorCode\": \"" + HttpContext.Current.Server.HtmlEncode(cevent.LegendGroupColorCode) + "\"," +
        "\"LegendGroupName\": \"" + Microsoft.Security.Application.AntiXss.HtmlEncode(cevent.LegendGroupName) + "\"" +
        "},";


    }
    public void ProcessRequest(HttpContext context)
    {
        try
        {
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("start method ProcessRequest(HttpContext context)", "Handler", "ProcessRequest(HttpContext context)");   
            context.Response.ContentType = "application/json";
            string conStr = ConnectionHelper.GetConnectionString("CMSConnectionString");
            System.Data.SqlClient.SqlConnection cn = new System.Data.SqlClient.SqlConnection(conStr);
            System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
            System.Data.SqlClient.SqlDataAdapter da = new System.Data.SqlClient.SqlDataAdapter();
            System.Data.DataSet ds = new System.Data.DataSet();

            if (context.Request["Type"] == "Legend")
            {
                if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("Inside Legend Condition :-@FormName" + Convert.ToString(context.Request.Cookies["formName"].Value), "Handler", "ProcessRequest(HttpContext context)");

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetLegendDetail";
                cmd.Parameters.AddWithValue("@FormName", Convert.ToString(context.Request.Cookies["formName"].Value));
                cmd.Connection = cn;
                da.SelectCommand = cmd;

                da.Fill(ds);
                if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("Inside Legend Condition :-Fill Legend into dataset", "Handler", "ProcessRequest(HttpContext context)");
                var myLegendData = ds.Tables[0].AsEnumerable().Select(r => new Events
                {
                    LegendGroupColorCode = r.Field<string>("LegendGroupColorCode"),
                    LegendGroupName = r.Field<string>("LegendGroupName")

                });
                var legendList = myLegendData.ToList();

                String resultLegend = String.Empty;
                resultLegend += "[";
                //List<int> idList = new List<int>();

                foreach (Events cevent in legendList)
                {
                    resultLegend += convertIntoString(cevent);
                    //idList.Add(cevent.id);
                }
                if (resultLegend.EndsWith(","))
                {
                    resultLegend = resultLegend.Substring(0, resultLegend.Length - 1);
                }
                resultLegend += "]";
                //context.Session["idList"] = idList;
                if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("Legend Result Set :-" + resultLegend, "Handler", "ProcessRequest(HttpContext context)");
                context.Response.Write(resultLegend);
                return;
            }
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("Before procedure marriottdelraybeachcom0009_GetEventDetail :-@DomainName :" + Convert.ToString(context.Request.QueryString["DomainName"]) + ",@FormName :" + Convert.ToString(context.Request.Cookies["formName"].Value), "Handler", "ProcessRequest(HttpContext context)");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "marriottdelraybeachcom0009_GetEventDetail";
            cmd.Parameters.AddWithValue("@DomainName", Convert.ToString(context.Request.QueryString["DomainName"]));
            cmd.Parameters.AddWithValue("@FormName", Convert.ToString(context.Request.Cookies["formName"].Value));
            cmd.Connection = cn;
            da.SelectCommand = cmd;

            da.Fill(ds);
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("Fill Events into dataset", "Handler", "ProcessRequest(HttpContext context)");

            var myData = ds.Tables[0].AsEnumerable().Select(r => new Events
            {
                id = r.Field<int>("BookingEventID"),
                title = r.Field<string>("EventName"),
                start = r.Field<DateTime?>("EventDate"),
                end = r.Field<DateTime?>("EventEndDate"),
                url = r.Field<string>("EventLocation"),
                eventdetails = r.Field<string>("EventDetails"),
                timestart = r.Field<string>("TimeStart"),
                timeend = r.Field<string>("TimeEnd"),
                repeatfrequency = r.Field<int?>("RepeatFrequency"),
                allDay = r.Field<bool>("EventAllDay"),
                sunday = r.Field<bool>("Sunday"),
                monday = r.Field<bool>("Monday"),
                tuesday = r.Field<bool>("Tuesday"),
                wednesday = r.Field<bool>("Wednesday"),
                thursday = r.Field<bool>("Thursday"),
                friday = r.Field<bool>("Friday"),
                saturday = r.Field<bool>("Saturday"),
                monthDate = r.Field<int?>("MonthDate"),
                monthFrequency = r.Field<int?>("MonthFrequency"),
                yearDate = r.Field<int?>("YearDate"),
                yearMonth = r.Field<int?>("YearMonth"),
                LegendGroupColorCode = r.Field<string>("LegendGroupColorCode"),
                LegendGroupName = r.Field<string>("LegendGroupName"),
                eventUrl = r.Field<string>("eventUrl"),
                monthIsDay = r.Field<int?>("monthIsDay"),
                monthWeek = r.Field<int?>("monthWeek"),
                monthDay = r.Field<int?>("monthDay"),
                MonthFrequencyForDay = r.Field<int?>("MonthFrequencyForDay"),
                YearIsDay = r.Field<int?>("YearIsDay"),
                YearMonthWeek = r.Field<int?>("YearMonthWeek"),
                YearMonthDay = r.Field<int?>("YearMonthDay"),
                YearMonthForDay = r.Field<int?>("YearMonthForDay")
            });
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("Filling Events into List", "Handler", "ProcessRequest(HttpContext context)");
            var list = myData.ToList();
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("Filled Events into List", "Handler", "ProcessRequest(HttpContext context)");

            var listYear = list.Where(e => e.repeatfrequency.Equals(4)).ToList();
            var listMonth = list.Where(e => e.repeatfrequency.Equals(3)).ToList();
            var listWeek = list.Where(e => e.repeatfrequency.Equals(2)).ToList();
            var listDaily = list.Where(e => e.repeatfrequency.Equals(1)).ToList();

            Events eWeek = null;
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("For each loop for yearly start", "Handler", "ProcessRequest(HttpContext context)");
            foreach (Events item in listYear)
            {
                DateTime startDate = Convert.ToDateTime(item.start);
                int daysInMonth;
                if (item.YearIsDay == 1)
                {
                    daysInMonth = DateTime.DaysInMonth(startDate.Year, item.yearMonth ?? 1);
                    for (DateTime i = new DateTime(startDate.Year, item.yearMonth ?? 1, (daysInMonth < item.yearDate ? daysInMonth : item.yearDate ?? 1)); i <= Convert.ToDateTime(item.end); i = i.AddYears(1))
                    {
                        daysInMonth = DateTime.DaysInMonth(i.Year, item.yearMonth ?? 1);
                        DateTime eventDate = new DateTime(i.Year, item.yearMonth ?? 1, (daysInMonth < item.yearDate ? daysInMonth : item.yearDate ?? 1));
                        if (eventDate >= Convert.ToDateTime(item.start) && eventDate <= Convert.ToDateTime(item.end))
                        {
                            eWeek = CreateEvent(item, eventDate);
                            list.Add(eWeek);
                        }
                    }
                }
                else if (item.YearIsDay == 2)
                {
                    daysInMonth = DateTime.DaysInMonth(startDate.Year, item.YearMonthForDay ?? 1);
                    for (DateTime i = new DateTime(startDate.Year, item.yearMonth ?? 1, (daysInMonth < item.yearDate ? daysInMonth : item.yearDate ?? 1)); i <= Convert.ToDateTime(item.end); i = i.AddYears(1))
                    {
                        DateTime stDate = new DateTime(i.Year, item.YearMonthForDay ?? 1, 1);
                        if (Convert.ToInt32(item.YearMonthDay) < 8)
                        {
                            DateTime eventDate;
                            if (item.YearMonthWeek < 5)
                                eventDate = GetEventDate(stDate, GetDayOfWeekByDayID(Convert.ToInt32(item.YearMonthDay)), Convert.ToInt32(item.YearMonthWeek));
                            else
                                eventDate = GetLastDateOfMonthByDay(i.Year, item.yearMonth ?? 1, GetDayOfWeekByDayID(Convert.ToInt32(item.YearMonthWeek)));

                            if (eventDate >= Convert.ToDateTime(item.start) && eventDate <= Convert.ToDateTime(item.end))
                            {
                                eWeek = CreateEvent(item, eventDate);
                                list.Add(eWeek);
                            }
                        }
                        else
                        {
                            DateTime eventDate;
                            if (item.YearMonthWeek < 5)
                                eventDate = GetEventDate(stDate, GetDayOfWeekByDayID(Convert.ToInt32(item.YearMonthDay)), Convert.ToInt32(item.YearMonthWeek));
                            else
                            {
                                DateTime lastDateOfMonth = new DateTime(i.Year, item.YearMonthWeek ?? 1, DateTime.DaysInMonth(i.Year, item.YearMonthWeek ?? 1));
                                if (lastDateOfMonth.DayOfWeek == DayOfWeek.Saturday)
                                    eventDate = GetLastDateOfMonthByDay(i.Year, item.yearMonth ?? 1, DayOfWeek.Saturday);
                                else
                                    eventDate = GetLastDateOfMonthByDay(i.Year, item.yearMonth ?? 1, DayOfWeek.Sunday);
                            }

                            if (eventDate >= Convert.ToDateTime(item.start) && eventDate <= Convert.ToDateTime(item.end))
                            {
                                eWeek = CreateEvent(item, eventDate);
                                list.Add(eWeek);
                            }
                        }
                    }
                }
                list.Remove(item);
            }
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("For each loop for Monthly start", "Handler", "ProcessRequest(HttpContext context)");
            foreach (Events item in listMonth)
            {
                if (item.monthIsDay == 1)
                {
                    DateTime startDate = Convert.ToDateTime(item.start);
                    int daysInMonth = DateTime.DaysInMonth(startDate.Year, startDate.Month);
                    for (DateTime i = new DateTime(startDate.Year, startDate.Month, (daysInMonth < item.monthDate ? daysInMonth : item.monthDate ?? 1)); i <= Convert.ToDateTime(item.end); i = i.AddMonths(item.monthFrequency ?? 1))
                    {
                        daysInMonth = DateTime.DaysInMonth(i.Year, i.Month);
                        DateTime eventDate = new DateTime(i.Year, i.Month, (daysInMonth < item.monthDate ? daysInMonth : item.monthDate ?? 1));
                        if (eventDate >= Convert.ToDateTime(item.start) && eventDate <= Convert.ToDateTime(item.end))
                        {
                            eWeek = CreateEvent(item, eventDate);
                            list.Add(eWeek);
                        }
                    }
                }
                else if (item.monthIsDay == 2)
                {
                    DateTime startDate = Convert.ToDateTime(item.start);
                    DateTime startDateOfMonth = new DateTime(startDate.Year, startDate.Month, 1);

                    for (DateTime i = startDateOfMonth; i <= Convert.ToDateTime(item.end); i = i.AddMonths(item.MonthFrequencyForDay ?? 1))
                    {
                        if (Convert.ToInt32(item.monthDay) < 8)
                        {
                            DateTime eventDate;
                            if (item.monthWeek < 5)
                                eventDate = GetEventDate(i, GetDayOfWeekByDayID(Convert.ToInt32(item.monthDay)), Convert.ToInt32(item.monthWeek));
                            else
                                eventDate = GetLastDateOfMonthByDay(i.Year, i.Month, GetDayOfWeekByDayID(Convert.ToInt32(item.monthDay)));

                            if (eventDate >= Convert.ToDateTime(item.start) && eventDate <= Convert.ToDateTime(item.end))
                            {
                                eWeek = CreateEvent(item, eventDate);
                                list.Add(eWeek);
                            }
                        }
                        else
                        {
                            DateTime eventDate;
                            if (item.monthWeek < 5)
                                eventDate = GetEventDate(i, DayOfWeek.Sunday, Convert.ToInt32(item.monthWeek));
                            else
                            {
                                DateTime lastDateOfMonth = new DateTime(i.Year, i.Month, DateTime.DaysInMonth(i.Year, i.Month));
                                if (lastDateOfMonth.DayOfWeek == DayOfWeek.Saturday)
                                    eventDate = GetLastDateOfMonthByDay(i.Year, i.Month, DayOfWeek.Saturday);
                                else
                                    eventDate = GetLastDateOfMonthByDay(i.Year, i.Month, DayOfWeek.Sunday);
                            }
                            if (eventDate >= Convert.ToDateTime(item.start) && eventDate <= Convert.ToDateTime(item.end))
                            {
                                eWeek = CreateEvent(item, eventDate);
                                list.Add(eWeek);
                            }
                        }
                    }
                }
                list.Remove(item);
            }
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("For each loop for weekly start", "Handler", "ProcessRequest(HttpContext context)");
            foreach (Events item in listWeek)
            {
                for (DateTime i = Convert.ToDateTime(item.start); i <= Convert.ToDateTime(item.end); i = i.AddDays(7))
                {
                    Dictionary<string, bool> weekdays = new Dictionary<string, bool>();
                    weekdays.Add("Sunday", item.sunday);
                    weekdays.Add("Monday", item.monday);
                    weekdays.Add("Tuesday", item.tuesday);
                    weekdays.Add("Wednesday", item.wednesday);
                    weekdays.Add("Thursday", item.thursday);
                    weekdays.Add("Friday", item.friday);
                    weekdays.Add("Saturday", item.saturday);
                    for (int dayOfWeek = 0; dayOfWeek < weekdays.Count; dayOfWeek++)
                    {
                        string day = i.AddDays(dayOfWeek).DayOfWeek.ToString();
                        if (weekdays[day] && i.AddDays(dayOfWeek) <= Convert.ToDateTime(item.end))
                        {
                            eWeek = new Events();
                            eWeek.start = i.AddDays(dayOfWeek);
                            eWeek.title = item.title;
                            eWeek.url = item.url;
                            eWeek.end = i.AddDays(dayOfWeek);
                            eWeek.timestart = item.timestart;
                            eWeek.timeend = item.timeend;

                            eWeek.eventdetails = item.eventdetails;
                            eWeek.allDay = item.allDay;
                            eWeek.LegendGroupColorCode = item.LegendGroupColorCode;
                            eWeek.eventUrl = item.eventUrl;
                            eWeek.LegendGroupName = item.LegendGroupName;
                            list.Add(eWeek);
                        }
                    }
                }
                list.Remove(item);
            }
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("For each loop for Daily start", "Handler", "ProcessRequest(HttpContext context)");
            foreach (Events item in listDaily)
            {
                for (DateTime i = Convert.ToDateTime(item.start); i <= Convert.ToDateTime(item.end); i = i.AddDays(1))
                {
                    eWeek = new Events();
                    eWeek.start = i;
                    eWeek.title = item.title;
                    eWeek.url = item.url;
                    eWeek.end = i;
                    eWeek.timestart = item.timestart;
                    eWeek.timeend = item.timeend;

                    eWeek.eventdetails = item.eventdetails;
                    eWeek.allDay = item.allDay;
                    eWeek.LegendGroupColorCode = item.LegendGroupColorCode;
                    eWeek.eventUrl = item.eventUrl;
                    eWeek.LegendGroupName = item.LegendGroupName;
                    list.Add(eWeek);
                }
                list.Remove(item);
            }
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("For each loop end", "Handler", "ProcessRequest(HttpContext context)");
            String result = String.Empty;
            result += "[";
            List<int> idList = new List<int>();
            foreach (Events cevent in list)
            {
                result += convertCalendarEventIntoString(cevent);
                idList.Add(cevent.id);
            }
            if (result.EndsWith(","))
            {
                result = result.Substring(0, result.Length - 1);
            }
            result += "]";
            context.Session["idList"] = idList;
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("Event Result :-" + result, "Handler", "ProcessRequest(HttpContext context)");
            context.Response.Write(result);
        }
        catch (Exception ex)
        {
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["isError"]) == true) LogManager.SaveLoggerError("StackTrace : " + Convert.ToString(ex.StackTrace) + "\n Message : " + Convert.ToString(ex.Message), "Handler"); 
        }

    }

    private string GetDayNameOfWeekByDayID(int dayID)
    {
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("GetDayNameOfWeekByDayID(int dayID) setart - dayID:" + dayID, "Handler", "GetDayNameOfWeekByDayID(int dayID)");
        string dayOfWeek;
        switch (dayID)
        {
            case 0:
                dayOfWeek = "Sunday";
                break;
            case 1:
                dayOfWeek = "Monday";
                break;
            case 2:
                dayOfWeek = "Tuesday";
                break;
            case 3:
                dayOfWeek = "Wednesday";
                break;
            case 4:
                dayOfWeek = "Thursday";
                break;
            case 5:
                dayOfWeek = "Friday";
                break;
            case 6:
                dayOfWeek = "Saturday";
                break;
            default:
                dayOfWeek = "Sunday";
                break;
        }
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("GetDayNameOfWeekByDayID(int dayID) end", "Handler", "GetDayNameOfWeekByDayID(int dayID)");
        return dayOfWeek;
    }

    public DateTime GetDateCopy(string[] Date)
    {
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("GetDateCopy(string[] Date)-Date: " + Date, "Handler", "GetDateCopy(string[] Date)");

        string week = Date[0].Trim();
        string weekday = Date[1].Trim();
        int Year = Convert.ToInt32(Date[2].Trim());
        string mnthname = Date[3].Trim();
        int Month = Convert.ToInt32(mnthname);

        DateTime dt = new DateTime(Year, Month, 01);


        //Extracting weeknumber; Below code if WeekNumber given like "04".
        string ValidWeekChars = "0123456789";
        string weeknumber = string.Empty;

        for (int i = 0; i < week.Length; i++)
        {
            if (ValidWeekChars.Contains(week[i]))
            {
                weeknumber = weeknumber + week[i];
            }
        }


        int returnDate = 0;
        int counter = 1;
        var month = dt;
        var weeks = Enumerable.Range(0, 4).Select(a => month.AddDays(a * 7 - (int)month.DayOfWeek + 1)).TakeWhile(monday => monday.Month == month.Month);

        //Below code gives Number of Weeks in a Month. Week is counted from Saturday to Saturday.
        var weekdays = Enumerable.Range(1, DateTime.DaysInMonth(Year, Month))
                .Select(day => new DateTime(Year, Month, day))
                .Where(a => a.DayOfWeek == DayOfWeek.Saturday)
                .ToList();


        foreach (var d in weekdays)
        {
            if (counter == Convert.ToInt32(weeknumber))
            {
                int CurrentDay = d.Day;
                int CurrentDayNumber = (int)d.DayOfWeek;

                int SelectedDayNumber = 0;

                if (weekday == "Monday")
                    SelectedDayNumber = (int)DayOfWeek.Monday;
                else if (weekday == "Tuesday")
                    SelectedDayNumber = (int)DayOfWeek.Tuesday;
                else if (weekday == "Wednesday")
                    SelectedDayNumber = (int)DayOfWeek.Wednesday;
                else if (weekday == "Thursday")
                    SelectedDayNumber = (int)DayOfWeek.Thursday;
                else if (weekday == "Friday")
                    SelectedDayNumber = (int)DayOfWeek.Friday;
                else if (weekday == "Saturday")
                    SelectedDayNumber = (int)DayOfWeek.Saturday;
                else if (weekday == "Sunday")
                    SelectedDayNumber = (int)DayOfWeek.Sunday;

                returnDate = CurrentDay - CurrentDayNumber + SelectedDayNumber;
            }
            counter = counter + 1;

        }
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("GetDateCopy(string[] Date) end", "Handler", "GetDateCopy(string[] Date)");
        return new DateTime(Year, Month, returnDate);
    }


    private String convertCalendarEventIntoString(Events cevent)
    {
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("convertCalendarEventIntoString(Events cevent) start", "Handler", "convertCalendarEventIntoString(Events cevent)");
        String allDay = "true";
        TimeSpan t = new TimeSpan();
        string[] time = null;
        if (cevent.timestart.ToLower().Contains("am"))
        {
            time = cevent.timestart.Replace("AM", "").Split(new char[] { ':' });
            t = new TimeSpan(Convert.ToInt32(time[0]), Convert.ToInt32(time[1]), 0);
            cevent.start = Convert.ToDateTime(cevent.start).Add(t);
        }
        else
        {
            time = cevent.timestart.Replace("PM", "").Split(new char[] { ':' });
            t = new TimeSpan(Convert.ToInt32(time[0]) + 12, Convert.ToInt32(time[1]), 0);
            cevent.start = Convert.ToDateTime(cevent.start).Add(t);
        }
        if (cevent.timeend.ToLower().Contains("am"))
        {
            time = cevent.timeend.Replace("AM", "").Split(new char[] { ':' });
            t = new TimeSpan(Convert.ToInt32(time[0]) + 12, Convert.ToInt32(time[1]), 0);
            cevent.end = Convert.ToDateTime(cevent.end).Add(t);
        }
        else
        {
            time = cevent.timeend.Replace("PM", "").Split(new char[] { ':' });
            t = new TimeSpan(Convert.ToInt32(time[0]), Convert.ToInt32(time[1]), 0);
            cevent.end = Convert.ToDateTime(cevent.end).Add(t);
        }
        if (ConvertToTimestamp(cevent.start).ToString().Equals(ConvertToTimestamp(cevent.end).ToString()))
        {

            if (Convert.ToDateTime(cevent.start).Hour == 0 && Convert.ToDateTime(cevent.start).Minute == 0 && Convert.ToDateTime(cevent.start).Second == 0)
            {
                allDay = "true";
            }
            else
            {
                allDay = "false";
            }
        }
        else
        {
            if (Convert.ToDateTime(cevent.start).Hour == 0 && Convert.ToDateTime(cevent.start).Minute == 0 && Convert.ToDateTime(cevent.start).Second == 0
                && Convert.ToDateTime(cevent.end).Hour == 0 && Convert.ToDateTime(cevent.end).Minute == 0 && Convert.ToDateTime(cevent.end).Second == 0)
            {
                allDay = "true";
            }
            else
            {
                allDay = "false";
            }
        }
        allDay = cevent.allDay == true ? "true" : "false";
        cevent.eventdetails = cevent.eventdetails.Replace("~/getmedia/", "/getmedia/");
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("Before Return event string", "Handler", "convertCalendarEventIntoString(Events cevent)");
        return "{" +
                  "\"id\": \"" + cevent.id + "\"," +
                  "\"title\": \"" + cevent.title + "\"," +
                  "\"start\":  \"" + Convert.ToDateTime(cevent.start).ToString("yyyy-MM-ddTHH:mm:ss") + "\"," +
                  "\"end\": " + ConvertToTimestamp(cevent.end).ToString() + "," +
                  "\"allDay\":" + allDay + "," +
                  "\"location\": \"" + Microsoft.Security.Application.AntiXss.HtmlEncode(cevent.url) + "\"," +
                  "\"timestart\": \"" + Microsoft.Security.Application.AntiXss.HtmlEncode(cevent.timestart) + "\"," +
                  "\"timeend\": \"" + Microsoft.Security.Application.AntiXss.HtmlEncode(cevent.timeend) + "\"," +
                  "\"description\": \"" + Microsoft.Security.Application.AntiXss.HtmlEncode(cevent.eventdetails) + "\"," +
                  "\"LegendGroupColorCode\": \"" + HttpContext.Current.Server.HtmlEncode(cevent.LegendGroupColorCode) + "\"," +
                  "\"eventUrl\": \"" + Microsoft.Security.Application.AntiXss.HtmlEncode(cevent.eventUrl) + "\"," +
                  "\"LegendGroupName\": \"" + Microsoft.Security.Application.AntiXss.HtmlEncode(cevent.LegendGroupName) + "\"" +

                  "},";
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    private long ConvertToTimestamp(DateTime? value)
    {
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("ConvertToTimestamp(DateTime? value) start", "Handler", "ConvertToTimestamp(DateTime? value)");
        long epoch = (Convert.ToDateTime(value).ToUniversalTime().Ticks - 621355968000000000) / 10000000;
        return epoch;
    }

    private bool NthDayOfMonth(DateTime date, DayOfWeek dow, int n)
    {
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("NthDayOfMonth(DateTime date, DayOfWeek dow, int n) start", "Handler", "NthDayOfMonth(DateTime date, DayOfWeek dow, int n)");
        int d = date.Day;
        return date.DayOfWeek == dow && (d - 1) / 7 == (n - 1);
    }

    private DateTime GetEventDate(DateTime startDate, DayOfWeek dow, int week)
    {
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("GetEventDate(DateTime startDate, DayOfWeek dow, int week) start - startDate :" + startDate + ",dow :" + dow + ",week :" + week, "Handler", "GetEventDate(DateTime startDate, DayOfWeek dow, int week)");
        DateTime eventDate = startDate;
        int daysInMonth = DateTime.DaysInMonth(startDate.Year, startDate.Month);
        DateTime lastDateMonth = new DateTime(startDate.Year, startDate.Month, daysInMonth);
        for (DateTime i = startDate; i <= lastDateMonth; i = i.AddDays(1))
        {
            if (NthDayOfMonth(i, dow, week))
            {
                eventDate = i;
                break;
            }
        }
        return eventDate;
    }

    private DayOfWeek GetDayOfWeekByDayID(int dayID)
    {
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("GetDayOfWeekByDayID(int dayID) start - dayID :" + dayID, "Handler", "GetDayOfWeekByDayID(int dayID)");
        DayOfWeek dayOfWeek;
        switch (dayID)
        {
            case 1:
                dayOfWeek = DayOfWeek.Sunday;
                break;
            case 2:
                dayOfWeek = DayOfWeek.Monday;
                break;
            case 3:
                dayOfWeek = DayOfWeek.Tuesday;
                break;
            case 4:
                dayOfWeek = DayOfWeek.Wednesday;
                break;
            case 5:
                dayOfWeek = DayOfWeek.Thursday;
                break;
            case 6:
                dayOfWeek = DayOfWeek.Friday;
                break;
            case 7:
                dayOfWeek = DayOfWeek.Saturday;
                break;
            default:
                dayOfWeek = DayOfWeek.Sunday;
                break;
        }
        return dayOfWeek;
    }

    private Events CreateEvent(Events item, DateTime eventDate)
    {
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("CreateEvent(Events item, DateTime eventDate) start - item :" + item + ",eventDate :" + eventDate, "Handler", "CreateEvent(Events item, DateTime eventDate)");
        Events eWeek = new Events();
        eWeek.start = eventDate;
        eWeek.title = item.title;
        eWeek.url = item.url;
        eWeek.end = eventDate;
        eWeek.timestart = item.timestart;
        eWeek.timeend = item.timeend;

        eWeek.eventdetails = item.eventdetails;
        eWeek.allDay = item.allDay;
        eWeek.LegendGroupColorCode = item.LegendGroupColorCode;
        eWeek.eventUrl = item.eventUrl;
        eWeek.LegendGroupName = item.LegendGroupName;
        return eWeek;
    }

    private DateTime GetLastDateOfMonthByDay(int year, int month, DayOfWeek dayOfWeek)
    {
        if (Convert.ToBoolean(ConfigurationManager.AppSettings["isTrace"]) == true) LogManager.SaveLoggerTrace("GetLastDateOfMonthByDay(int year, int month, DayOfWeek dayOfWeek) start - year:" + year + ",month :" + month + ",dayOfWeek :" + dayOfWeek, "Handler", "GetLastDateOfMonthByDay(int year, int month, DayOfWeek dayOfWeek)");
        var daysInMonth = DateTime.DaysInMonth(year, month);

        for (int day = daysInMonth; day > 0; day--)
        {
            DateTime currentDateTime = new DateTime(year, month, day);
            switch (dayOfWeek)
            {
                case DayOfWeek.Monday:
                    if (currentDateTime.DayOfWeek == DayOfWeek.Monday)
                        return currentDateTime;
                    break;
                case DayOfWeek.Tuesday:
                    if (currentDateTime.DayOfWeek == DayOfWeek.Tuesday)
                        return currentDateTime;
                    break;
                case DayOfWeek.Wednesday:
                    if (currentDateTime.DayOfWeek == DayOfWeek.Wednesday)
                        return currentDateTime;
                    break;
                case DayOfWeek.Thursday:
                    if (currentDateTime.DayOfWeek == DayOfWeek.Thursday)
                        return currentDateTime;
                    break;
                case DayOfWeek.Friday:
                    if (currentDateTime.DayOfWeek == DayOfWeek.Friday)
                        return currentDateTime;
                    break;
                case DayOfWeek.Saturday:
                    if (currentDateTime.DayOfWeek == DayOfWeek.Saturday)
                        return currentDateTime;
                    break;
                case DayOfWeek.Sunday:
                    if (currentDateTime.DayOfWeek == DayOfWeek.Sunday)
                        return currentDateTime;
                    break;
                default:
                    break;
            }
        }
        return new DateTime();
    }


}

public class Events
{
    public int id { get; set; }
    public string title { get; set; }

    public string eventdetails { get; set; }
    public string url { get; set; }
    public DateTime? start { get; set; }
    public DateTime? end { get; set; }
    public string timestart { get; set; }
    public string timeend { get; set; }
    public int? weekday { get; set; }
    public int? repeats { get; set; }
    public int? repeatfrequency { get; set; }
    public bool allDay { get; set; }
    public bool sunday { get; set; }
    public bool monday { get; set; }
    public bool tuesday { get; set; }
    public bool wednesday { get; set; }
    public bool thursday { get; set; }
    public bool friday { get; set; }
    public bool saturday { get; set; }
    public int? monthDate { get; set; }
    public int? monthFrequency { get; set; }
    public int? yearDate { get; set; }
    public int? yearMonth { get; set; }
    public string LegendGroupColorCode { get; set; }
    public string eventUrl { get; set; }
    public int? monthIsDay { get; set; }
    public int? monthWeek { get; set; }
    public int? monthDay { get; set; }
    public int? MonthFrequencyForDay { get; set; }
    public int? YearIsDay { get; set; }
    public int? YearMonthWeek { get; set; }
    public int? YearMonthDay { get; set; }
    public int? YearMonthForDay { get; set; }
    public string LegendGroupName { get; set; }
}

class LogManager
{
    const string SubDirectoryTrace = "CalendarLog\\TRACE";
    const string SubDirectoryError = "CalendarLog\\ERROR";
    //const string DefaultRootDirectory = "C:\\Program Files\\DeviceCommunicationServiceHost\\DeviceHostServiceLog\\";
    //const string DefaultRootDirectory = "C:\\Program Files\\CMSLog\\";
    const string DefaultRootDirectory = "C:\\Program Files\\CMSLog\\";

    public string CreateFilePathWithDirectoryDetails(bool IsTrace)
    {
        //string s =HttpContext.Current.Request.MapPath("~/Example.txt");
        //DefaultRootDirectory = HttpContext.Current.Server.MapPath();
        string logFileName = string.Empty;
        try
        {

            //string strRootDirectory = Convert.ToString(ConfigurationManager.AppSettings["LogDirectory"]);
            //if (string.IsNullOrEmpty(strRootDirectory))
            //{
            //    strRootDirectory = DefaultRootDirectory;
            //}
            //string strRootDirectory = DefaultRootDirectory;
            string strRootDirectory = HttpContext.Current.Server.MapPath("/");
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

    public static void SaveLoggerTrace(string strTrace, string pageName, string methodName)
    {
        //bool EnableTracing = false;
        //if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["EnableTracing"]))
        //{
        //    string tracingKeyValue = ConfigurationManager.AppSettings["EnableTracing"].ToLower();
        //    if (tracingKeyValue == "true" || tracingKeyValue == "false")
        //    {
        //        EnableTracing = Convert.ToBoolean(tracingKeyValue);
        //    }
        //}
        bool EnableTracing = true;
        if (EnableTracing)
        {
            string fileName = (new LogManager()).CreateFilePathWithDirectoryDetails(true);
            StreamWriter objWrite = null;
            StringBuilder sbContentFormat = new StringBuilder();
            sbContentFormat.AppendLine("==============================================");
            sbContentFormat.AppendLine("Page Name: " + pageName);
            sbContentFormat.AppendLine("Method Name: " + methodName);
            sbContentFormat.AppendLine(strTrace);
            sbContentFormat.AppendLine("==============================================");
            using (objWrite = new StreamWriter(fileName, true, Encoding.UTF8))
            {
                objWrite.WriteLine(sbContentFormat.ToString());
            }
        }
    }
} 