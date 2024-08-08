document.addEventListener('DOMContentLoaded', function () {

    // Event listener for booking form submission
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const doctorName = document.getElementById('chooseDoctor').value;
        const dateTime = document.getElementById('bookingTime').value;

        // Check doctor availability
        const isAvailable = await checkDoctorAvailability(doctorName, dateTime);
        if (isAvailable) {
            alert('Doctor is available at the selected time. Booking successful!');
            // Perform any other action upon successful booking
        } else {
            alert('Doctor is not available at the selected time. Please choose another time.');
        }

        if (validateForm() && isAvailable) {
            bookingForm.submit(); // Submit the form if validation passes
        }
    });

    // Fetch doctor data from JSON File
    fetch('doctors.json')
        .then(response => response.json())
        .then(data => {
            const doctors = data.doctors;
            const departmentSelect = document.getElementById('chooseDepartment');
            const doctorSelect = document.getElementById('chooseDoctor');
            const priceDisplay = document.getElementById('displayPrice');

            // Populate dropdown menu with unique departments 
            const departments = [...new Set(doctors.map(doctor => doctor.department))];
            departments.forEach(department => {
                const option = document.createElement('option');
                option.textContent = department;
                option.value = department;
                departmentSelect.appendChild(option);
            });

            // Event listener for department selection
            departmentSelect.addEventListener('change', () => {
                const selectedDepartment = departmentSelect.value;
                const filteredDoctors = doctors.filter(doctor => doctor.department === selectedDepartment);



                // Populate doctor dropdown with doctors from selected department 
                filteredDoctors.forEach(doctor => {
                    const option = document.createElement('option');
                    option.textContent = doctor.name;
                    option.value = doctor.name; // use doctor name as value
                    doctorSelect.appendChild(option);
                });
            });

            // // clear previous doctor options 
            // doctorSelect.innerHTML = '';

            // Event listener for doctor selection
            doctorSelect.addEventListener('change', () => {
                const selectedDoctor = doctorSelect.value; // Get selected doctor name
                const selectedPrice = doctors.find(doctor => doctor.name === selectedDoctor)?.price;
                if (selectedPrice) {
                    priceDisplay.value = `${selectedPrice} LE`;
                } else {
                    priceDisplay.value = '';
                }
            });
        })
        .catch(error => console.error('Error fetching doctor data : ', error));

    // Function Validation Inputs 
    function validateForm() {
        let isValid = true;

        // Regular expressions for validation
        const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
        const ageRegex = /^\d+$/;
        const emailRegex = /^\S+@\S+\.\S+$/;
        const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
        const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^\d{3}$/;

        // Basic data validation
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const age = document.getElementById('age').value.trim();
        const email = document.getElementById('email').value.trim();
        const gender = document.getElementById('gender').value;

        if (!firstName.match(nameRegex)) {
            isValid = false;
            document.getElementById('firstNameERROR').innerHTML = 'Please enter a valid first name.';
        } else {
            document.getElementById('firstNameERROR').innerHTML = '';
        }

        if (!lastName.match(nameRegex)) {
            isValid = false;
            document.getElementById('lastNameERROR').innerHTML = 'Please enter a valid last name.';
        } else {
            document.getElementById('lastNameERROR').innerHTML = '';
        }

        if (!phoneNumber.match(phoneNumberRegex)) {
            isValid = false;
            document.getElementById('phoneNumberERROR').innerHTML = 'Please enter a valid phone number (format: 123-456-7890).';
        } else {
            document.getElementById('phoneNumberERROR').innerHTML = '';
        }

        if (!age.match(ageRegex)) {
            isValid = false;
            document.getElementById('ageERROR').innerHTML = 'Please enter a valid age.';
        } else {
            document.getElementById('ageERROR').innerHTML = '';
        }

        if (!email.match(emailRegex)) {
            isValid = false;
            document.getElementById('emailERROR').innerHTML = 'Please a valid email address.';
        } else {
            document.getElementById('emailERROR').innerHTML = '';
        }

        if (gender === '') {
            isValid = false;
            document.getElementById('genderERROR').innerHTML = 'Please select a gender.';
        } else {
            document.getElementById('genderERROR').innerHTML = '';
        }

        // Booking data validation
        const chooseDepartment = document.getElementById('chooseDepartment').value;
        const chooseDoctor = document.getElementById('chooseDoctor').value;
        const bookingTime = document.getElementById('bookingTime').value.trim();

        if (chooseDepartment === '') {
            isValid = false;
            document.getElementById('chooseDepartmentERROR').innerHTML = 'Please Choose a department.';
        } else {
            document.getElementById('chooseDepartmentERROR').innerHTML = '';
        }

        if (chooseDoctor === '') {
            isValid = false;
            document.getElementById('chooseDoctorERROR').innerHTML = 'Please choose a doctor.';
        } else {
            document.getElementById('chooseDoctorERROR').innerHTML = '';
        }

        if (bookingTime === '') {
            isValid = false;
            document.getElementById('bookingTimeERROR').innerHTML = 'Please enter a booking time';
        } else {
            document.getElementById('bookingTimeERROR').innerHTML = '';
        }

        // Final step validation 
        const paymentMethod = document.getElementById('paymentMethod').value;
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expDate = document.getElementById('expDate').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (paymentMethod === '') {
            isValid = false;
            document.getElementById('paymentMethodERROR').innerHTML = 'Please select a payment method.';
        } else {
            document.getElementById('paymentMethodERROR').innerHTML = '';
        }

        if (!cardNumber.match(cardNumberRegex)) {
            isValid = false;
            document.getElementById('cardNumberERROR').innerHTML = 'Please enter a valid card number (format: 1234 5678 9012 3456)';
        } else {
            document.getElementById('cardNumberERROR').innerHTML = '';
        }

        if (!expDate.match(expDateRegex)) {
            isValid = false;
            document.getElementById('expDateERROR').innerHTML = 'Please enter a valid expriration date (formatL MM/YY).';
        } else {
            document.getElementById('expDateERROR').innerHTML = '';
        }

        if (!cvv.match(cvvRegex)) {
            isValid = false;
            document.getElementById('cvvERROR').innerHTML = 'Please enter a valid CVV (3 digits).';
        } else {
            document.getElementById('cvvERROR').innerHTML = '';
        }
        return isValid;
    }

    // Availability Function
    async function checkDoctorAvailability(doctorName, dateTime) {
        try {
            // Fetch availability data from JSON file
            const response = await fetch('doctors.json');
            if (!response.ok) {
                throw new Error('Failed to fetch availability data');
            }
            const data = await response.json();

            // Find the doctor object by name
            const doctor = data.doctors.find(doc => doc.name === doctorName);

            // If doctor not found, return false (unavailable)
            if (!doctor) return false;

            // Extract date and time components from the provided dateTime string
            const selectedDate = new Date(dateTime).toISOString().split('T')[0]; // Extract date part
            const selectedTime = new Date(dateTime).toLocaleTimeString('en-US', { hour12: true }); // Extract time part

            // Check if the selected date falls within the availability range
            const availability = doctor.availability.find(avail => {
                const [startDate, endDate] = avail.date.split(' : ');
                return selectedDate >= startDate && selectedDate <= endDate;
            });

            // If availability data for the selected date is not found, return false (unavailable)
            if (!availability) return false;

            // Get available time slots for the selected date
            const availableTimeSlots = availability.timeslots;

            // Check if the selected time falls within any of the available time slots
            const isAvailable = availableTimeSlots.some(slot => {
                const [startTime, endTime] = slot.split(' - ');
                return isBetween(selectedTime, startTime, endTime);
            });

            return isAvailable;
        } catch (error) {
            console.error('Error fetching availability data:', error);
            return false; // Return false in case of error
        }
    }

    // Function to check if a time is between start and end times
    function isBetween(time, startTime, endTime) {
        // Convert times to 24-hour format for comparison
        const [startHour, startMinute] = convertTo24HourFormat(startTime);
        const [endHour, endMinute] = convertTo24HourFormat(endTime);
        const [hour, minute] = convertTo24HourFormat(time);

        // Check if the time falls within the start and end times
        if (hour > startHour && hour < endHour) {
            return true;
        } else if (hour === startHour && minute >= startMinute) {
            return true;
        } else if (hour === endHour && minute <= endMinute) {
            return true;
        } else {
            return false;
        }
    }

    // Function to convert time from 12-hour format to 24-hour format
    function convertTo24HourFormat(time) {
        const [timeString, period] = time.split(' ');
        const [hourString, minuteString] = timeString.split(':');
        let hour = parseInt(hourString);
        const minute = parseInt(minuteString);

        if (period === 'PM' && hour !== 12) {
            hour += 12;
        } else if (period === 'AM' && hour === 12) {
            hour = 0;
        }

        return [hour, minute];
    }

});

