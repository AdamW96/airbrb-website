*** For 2.1.2. Register Screen
    On the registration screen, we tested the validity of the name and email address, as well as the strength of the password.
*** For 2.2.2. Hosted Listing Create
    When creating a listing, we use the step form in the front-end design, Users need to fill in information page by page, this is more user friendly than using a single form to fill in all information. The difficulty in doing this is that we have to use a lot of html to build the step form  and process of data from user input.
    Also for each input we provide a detection mechanism to prevent incorrect input by the user, and we also prompt the user for what information should be entered.
*** For 2.2.4. Publishing a listing
    When a landlord is publishing a listing, they can enter multiple time ranges and if this multiple time range has overlapping parts, we will combine the two time ranges into one.
*** For 2.4.1. View a Selected Listing
    When users view detailed information about a specific listing, we also show the average score in this page.
*** For 2.4.2. Making a booking and checking its status
    Once a user has booked a listing, we also provide a delete button to remove this booking.
*** For 2.6.2 Listing Profits Graph
    When showing profits for the past month, we test all valid profits. For example, if today is 16 November and there is a scheduled period from 10 to 20 November, we will include the profits from 10 November to 16 November(today).