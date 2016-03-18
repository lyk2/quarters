// todo: , edit, repeating, color code, reset, time range

$(document).ready(function() {

	$('#calendar').fullCalendar({

		// initialize the calendar
		header: {
			left: '',
			center: 'prev title next',
			right: 'today'
		},
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		nowIndicator: true,
		selectable: true,
		selectHelper: true,

		// Google Calendar API
		//- googleCalendarApiKey: 'AIzaSyABDKnGkEvFCN9UDlq7GCyep99uMvnclYM',
		//- events: {
		//- 	googleCalendarId: 'oomoup4h350ojq5dsh6nl2qtu0@group.calendar.google.com'
		//- },

		// gets time when calendar is selected, then opens modal
		select: function (start, end, allDay) {
			mEnd = moment(end).format('dddd, MMMM D');
			mStart = moment(start).format('dddd, MMMM D');
			var mWhen = mStart + ' - ' + mEnd;

			$('#eventStartTime').val(start);
			$('#eventEndTime').val(end);
			$('#eventAllDay').val(allDay);
			$('#when').text(mWhen);
			$('#createEventModal').modal('show');
		},

		// to edit event
		eventClick: function (event, jsEvent, view) {
			// call from database
			$('#editEventModal').modal('show');
			event.title = "title";
			// backgroundColor = $('cal');
			// event.start = $('#eventStartTime').val();
			// event.end = $('#eventEndTime').val();
			// event.allDay = $('#eventAllDay').val();
			// $('#when').text();
			$("#deleteEvent").click(function() { // event handler to delete event
               $('#calendar').fullCalendar('removeEvents',event._id);
            });

			$('#calendar').fullCalendar('updateEvent', event);
		},
	});

	// when submit button on modal is clicked, modal closes and event is rendered on calendar
	$('#submitButton').on('click', function(e) {
		e.preventDefault();
		$('#createEventModal').modal('hide');

		//send to database
		doSubmit();
		});

	function doSubmit() {
		$('#calendar').fullCalendar('renderEvent', 
        	{
			title: $('#eventName').val(),
			start: $('#eventStartTime').val(),
			end: $('#eventEndTime').val(),
			allDay: true,
			color: $('input[name=cal]:checked', '#createEventModal').val()
			},
			true); // stick the event
        
		$('#calendar').fullCalendar('unselect');
	}
});