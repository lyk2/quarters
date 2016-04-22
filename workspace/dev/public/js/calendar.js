// todo: , edit, repeating, color code, reset, time range

$(document).ready(function() {

	// when submit button on modal is clicked, modal closes and event is rendered on calendar
	$('#submitButton').on('click', function(e) {
		e.preventDefault();
		$('#createEventModal').modal('hide');
		$('#eventName').val();

		//send to database
		$.ajax({
			url: "../db/calendar/addEvent",
			type: "POST",
			dataType: 'json',
			data: {
				'event_title': $('#eventName').val(),
				'event_start': $('#eventStartTime').val(),
				'event_end': $('#eventEndTime').val(),
				'event_color': $('input[name=cal]:checked').val(),
				'event_allDay': true
			},			
			error: function (error) {
                alert("Event not successfully added error");
            }
		});

		// render event on calendar
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


	});

	// initialize the calendar
	$('#calendar').fullCalendar({
		
		// get events from db
		events: {
	        url: '../db/calendar/getEvents',
	        type: 'POST',
	        dataType: 'json',
	        error: function() {
	            alert('there was an error while fetching events!');
	        }
	    },

		// fullcalendar options
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

		// add event to calendar
		// gets time when calendar is selected, then opens modal
		select: function (start, end, allDay) {
			var mEnd = moment(end).format('dddd, MMMM D, hA');
			var mStart = moment(start).format('dddd, MMMM D, hA');
			var mWhen = mStart + ' - ' + mEnd;

			// sets the modal with the selected time
			$('#eventStartTime').val(start);
			$('#eventEndTime').val(end);
			$('#eventAllDay').val(allDay);
			$('#when').text(mWhen);
			$('#createEventModal').modal('show');

		},

		// Convert the allDay from string to boolean
		// eventRender: function(event, element, view) {
		// 	if (event.allDay === 'true') {
		// 	 	event.allDay = true;
		// 	} else {
		// 	 	event.allDay = true;
		// 	}
		// },

		// edit date of event
		eventDrop: function(event, delta, revertFunc) {
			// var end = event.end.format('dddd, MMMM D');
			// var start = event.start.format('dddd, MMMM D');
			// var title = event.title;
			$.ajax({
				url: '../db/calendar/editEvent',
				type: 'post',
				data: {
					'event_start': event.start.format('dddd, MMMM D'),
					'event_end': event.end.format('dddd, MMMM D'),
					'event_id': event.id,
					'event_color': event.color,
					'event_title': event.title

				},
				type: "POST",
				success: function(json) {
				},
				error: function (error) {
                    alert("Update not successful");
                }
			});
		},

		// to delete event
		eventClick: function (event) {
			$('#deleteEventModal').modal('show');
			$("#deleteEvent").click(function() { // event handler to delete event
				$.ajax({
					url: '../db/calendar/deleteEvent',
					data: {
						'event_id': event.id
					},
					type: "POST",
					success: function(data) {
						$('#calendar').fullCalendar('removeEvents', event._id);
					},
					error: function (error) {
	                    alert("Deletion not successful");
	                }
				});
			});

			$('#calendar').fullCalendar('updateEvent', event);
		}
	});

		// to edit event
		// eventClick: function (event, jsEvent, view) {
		// 	// call from database
		// 	$('#editEventModal').modal('show');
		// 	event.title = "title";
		// 	// backgroundColor = $('cal');
		// 	// event.start = $('#eventStartTime').val();
		// 	// event.end = $('#eventEndTime').val();
		// 	// event.allDay = $('#eventAllDay').val();
		// 	// $('#when').text();
		// 	$("#deleteEvent").click(function() { // event handler to delete event
  //              $('#calendar').fullCalendar('removeEvents',event._id);
  //           });

		// 	$('#calendar').fullCalendar('updateEvent', event);
		// },
});