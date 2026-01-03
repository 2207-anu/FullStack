const slots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM"
];

const date = "1/2/2026";

// No pre-booked data
const bookings = {
    courtA: [],
    courtB: []
};

let selectedCourt = "";
let selectedTime = "";

function createCard(court, time) {
    const bookedSlot = bookings[court].find(b => b.time === time);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <div>
            <div class="card-header">
                <span class="court-name">${court === "courtA" ? "Court A" : "Court B"}</span>
                <span class="status ${bookedSlot ? "booked" : "available"}">
                    ${bookedSlot ? "Booked" : "Available"}
                </span>
            </div>

            <div class="info">⏰ ${time}</div>
            <div class="info">📅 ${date}</div>

            ${bookedSlot ? `<div class="booked-by">Booked by: ${bookedSlot.by}</div>` : ""}
        </div>

        <div class="action-area">
            ${
                bookedSlot
                ? `<button class="cancel-booking">Cancel Booking</button>`
                : `<button class="book-btn">Book Now</button>`
            }
        </div>
    `;

    // BOOK
    if (!bookedSlot) {
        card.querySelector(".book-btn").addEventListener("click", () => {
            selectedCourt = court;
            selectedTime = time;
            openModal();
        });
    }

    // CANCEL
    if (bookedSlot) {
        card.querySelector(".cancel-booking").addEventListener("click", () => {
            const ok = confirm("Do you want to cancel this booking?");
            if (ok) {
                bookings[court] = bookings[court].filter(b => b.time !== time);
                render();
            }
        });
    }

    return card;
}


function render() {
    document.getElementById("courtA").innerHTML = "";
    document.getElementById("courtB").innerHTML = "";

    slots.forEach(time => {
        document.getElementById("courtA").appendChild(createCard("courtA", time));
        document.getElementById("courtB").appendChild(createCard("courtB", time));
    });
}

function openModal() {
    document.getElementById("bookingModal").classList.add("active");
}

function closeModal() {
    document.getElementById("bookingModal").classList.remove("active");
    document.getElementById("userName").value = "";
}

function confirmBooking() {
    const name = document.getElementById("userName").value.trim();

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    bookings[selectedCourt].push({
        time: selectedTime,
        by: name
    });

    closeModal();
    render();
}

render();
