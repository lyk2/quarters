$.getScript('http://arshaw.com/js/fullcalendar-1.6.4/fullcalendar/fullcalendar.min.js',function(){
  
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    editable: true,
    events: [
      {
        title: 'Garbage (Lucy)',
        start: new Date(y, m, 2)
      },
      {
        title: 'Garbage (John)',
        start: new Date(y, m, 9)
      },
      {
        title: 'Garbage (Jane)',
        start: new Date(y, m, 16)
      },
      {
        title: 'Garbage (Lucy)',
        start: new Date(y, m, 23)
      },
      {
        title: 'Garbage (John)',
        start: new Date(y, m, 30)
      },
      {
        title: 'Fall Cleaning',
        start: new Date(y, m, d-5),
        end: new Date(y, m, d-3)
      },
      {
        id: 999,
        title: 'Vacuum',
        start: new Date(y, m, d-3, 16, 0),
        allDay: false
      },
      {
        id: 999,
        title: 'Vacuum',
        start: new Date(y, m, d+4, 16, 0),
        allDay: false
      },
      {
        title: 'Clean Fridge (John)',
        start: new Date(y, m, d, 10, 30),
        allDay: false
      },
      {
        title: 'Clean Main Bath (Jane)',
        start: new Date(y, m, d, 12, 0),
        end: new Date(y, m, d, 14, 0),
        allDay: false
      },
      {
        title: 'Dishes (Lucy)',
        start: new Date(y, m, d+1, 10, 30),
        end: new Date(y, m, d+1, 12, 30),
        allDay: false
      }
    ]
  });
})