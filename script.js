document.getElementById("bookingForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const classroom = document.getElementById("classroom").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const booking = { name, email, classroom, date, time };
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    document.getElementById("modal").style.display = "block";
    document.getElementById("booking-details").innerHTML = `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Classroom: ${classroom}</p>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
    `;

    this.reset();
});

document.querySelector(".close-btn")?.addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const bookingList = document.getElementById("bookingList");

bookings.forEach((booking, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>Name:</strong> ${booking.name}<br>
        <strong>Email:</strong> ${booking.email}<br>
        <strong>Classroom:</strong> ${booking.classroom}<br>
        <strong>Date:</strong> ${booking.date}<br>
        <strong>Time:</strong> ${booking.time}<br>
        <button class="delete-btn" data-index="${index}">Delete</button>
        <hr>
    `;
    bookingList.appendChild(li);
});

document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        bookings.splice(index, 1);
        localStorage.setItem("bookings", JSON.stringify(bookings));
        window.location.reload();
    });
});
