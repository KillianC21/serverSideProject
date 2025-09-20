//the date input doesnt allow past dates
const dateInput = document.getElementById('date');
if (dateInput) {
    const now = new Date();
    const today = now.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    dateInput.min = today; // Set the minimum selectable date
}

//handle form submission, change method to PUT for updating 
const form = document.getElementById('updateForm');
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    form.method = 'PUT'; // Change the form method to PUT
    form.submit(); // Submit the form after changing the method
});
  





