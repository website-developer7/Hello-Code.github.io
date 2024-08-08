import json
import random

departments = [
    "Surgery", "Women and Maternity", "Internal Medicine", "Children",
    "Radiology", "Medical Analysis", "Dentistry", "Ophthalmology",
    "Orthopedic", "Gastroenterology", "Neurology", "Plastic Surgery",
    "Physiotherapy"
]

doctors = []

for i in range(1, 131):  # Generate data for 130 doctors
    doctor = {
        "id": i,
        "name": f"Dr. {random.choice(['John', 'Jane', 'Michael', 'Sarah', 'Alex', 'Emily', 'David', 'Rachel','Nour'])} {random.choice(['Doe', 'Smith', 'Brown', 'Johnson', 'Lee', 'White', 'Miller', 'Green','Abo Alwafa'])}",
        "department": random.choice(departments),
        "price": random.randint(100, 5000),
        "phone": f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}",
        "availability": [
            {"date": "2024-01-01 : 2024-12-31","timeslots": ["6:00 AM - 12:00 PM", "2:00 PM - 10:00 PM"]}
        ]  # Example availability, you may adjust this as needed
    }
    doctors.append(doctor)

# Write data to doctors.json file
with open('doctors.json', 'w') as f:
    json.dump({"doctors": doctors}, f, indent=2)
