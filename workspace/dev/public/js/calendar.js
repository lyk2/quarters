// todo: , edit, repeating, color code, reset, time range

$(document).ready(function() {

	// initialize the calendar
	$('#calendar').fullCalendar({
		
		// get events from db
		events: {
            url: "../db/calendar/getEvents",
            type: "POST",
            data: {
            	"title":"event_title",

            },
          	error: function() {
          		alert('There was an error while fetching events!');
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

		// gets time when calendar is selected, then opens modal
		select: function (start, end, allDay) {
			var mEnd = moment(end).format('dddd, MMMM D');
			var mStart = moment(start).format('dddd, MMMM D');
			var mWhen = mStart + ' - ' + mEnd;

			// sets the modal with the selected time
			$('#eventStartTime').val(start);
			$('#eventEndTime').val(end);
			$('#eventAllDay').val(allDay);
			$('#when').text(mWhen);
			$('#createEventModal').modal('show');

			// when submit button on modal is clicked, modal closes and event is rendered on calendar
			$('#submitButton').on('click', function(e) {
				e.preventDefault();
				$('#createEventModal').modal('hide');

				//send to database
				$.ajax({
					url: "../db/calendar/addEvent",
					type: "POST",
					dataType: 'json',
					data: {
						'event_title': $('#eventName').val(),
						'event_start': $('#eventStartTime').val(),
						'event_end': $('#eventEndTime').val(),
						'event_color': $('input[name=cal]:checked').val()
					},				
					success: function(response) {
						alert('Added Successfully');
						$("#calendar").fullCalendar("refetchEvents");
					},
					error: function (error) {
                        alert("event error");
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

			});

			$('#calendar').fullCalendar('unselect');


		// show/hide a loading indicator
			// loading: function(bool) {
			//   if (bool) 
			//     $('#loading').show();
			//   else 
			//     $('#loading').hide();
			// },

		}, // end of select function

		// edit date of event
		eventResize: function(event) {
			var end = moment(event.end).format('dddd, MMMM D');
			var start = moment(event.start).format('dddd, MMMM D');
			$.ajax({
				url: '../db/calendar/editEvent',
				type: 'post',
				data: {
					'event_start': start,
					'event_end': end,
				},
				type: "POST",
				success: function(data) {
					alert("Updated Successfully");
				},
				error: function (error) {
                    alert("Update not successful");
                }
			});
		},

		// to delete event
		eventClick: function (event, jsEvent, view) {
			// call from database
			$('#editEventModal').modal('show');
			$("#deleteEvent").click(function() { // event handler to delete event
				function confirm() {
					confirm("Are you sure you want to delete this event?");
				}
				// if (confirm) {
					$.ajax({
						url: '../db/calendar/deleteEvent',
						data: {
							'event_id': event.id
						},
						type: "POST",
						success: function(data) {
							alert("Event deleted");
							$('#calendar').fullCalendar('removeEvents',event.id);
						},
						error: function (error) {
		                    alert("Deletion not successful");
		                }
					});
				// }
				// else {

				// }
				
            });

			// $('#calendar').fullCalendar('updateEvent', event);
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

	// // when submit button on modal is clicked, modal closes and event is rendered on calendar
	// $('#submitButton').on('click', function(e) {
	// 	e.preventDefault();
	// 	$('#createEventModal').modal('hide');

	// 	//send to database
	// 	doSubmit();
	// 	});

	// function doSubmit() {
	// 	$('#calendar').fullCalendar('renderEvent', 
 //        	{
	// 		title: $('#eventName').val(),
	// 		start: $('#eventStartTime').val(),
	// 		end: $('#eventEndTime').val(),
	// 		allDay: true,
	// 		color: $('input[name=cal]:checked', '#createEventModal').val()
	// 		},
	// 		true); // stick the event
        
	// 	$('#calendar').fullCalendar('unselect');
	// }
});

	// $.ajax({ 
 //        url: "../db/calendar/getEvents", 
 //        type: 'POST',
 //        error: function() {
 //            alert('there was an error while fetching events!');
 //        } 
 //    }).done(function (data) { 
 //            var event = Array();
 //                $.each(data, function(i, entry) {
 //                    event.push({title: entry.title, start: entry.start});
 //                }); 
 //            $('#calendar').fullCalendar({
 //                header: {
	// 				left: '',
	// 				center: 'prev title next',
	// 				right: 'today'
	// 			},
	// 			editable: true,
	// 			eventLimit: true, // allow "more" link when too many events
	// 			nowIndicator: true,
	// 			selectable: true,
	// 			selectHelper: true,
 //            });
 //    });