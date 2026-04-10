import { useState, useEffect } from "react";
function StaffPortal() {

  const initialResidents = [
  {
    id: 1,
    name: "Lakshmi Devi",
    age: 72,
    gender: "Female",
    room: "A101",
    medicalHistory: "Hypertension",
    allergies: "Penicillin",
    medications: "Amlodipine 5mg",
    diet: "Vegetarian",
    activity: "Yoga",
    family: {
      name: "Ravi ",
      relation: "Son",
      phone: "9876543210",
      email: "ravi@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  },
  {
    id: 2,
    name: "Meenakshi ",
    age: 78,
    gender: "Female",
    room: "A102",
    medicalHistory: "Diabetes",
    allergies: "None",
    medications: "Metformin",
    diet: "Low Sugar",
    activity: "Gardening",
    family: {
      name: "Suresh ",
      relation: "Son",
      phone: "9123456780",
      email: "suresh@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  },
  {
    id: 3,
    name: "Raghavan ",
    age: 81,
    gender: "Male",
    room: "B201",
    medicalHistory: "Arthritis",
    allergies: "Dust",
    medications: "Pain Tablets",
    diet: "Balanced",
    activity: "Walking",
    family: {
      name: "Anitha",
      relation: "Daughter",
      phone: "9988776655",
      email: "anita@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  },
  {
    id: 4,
    name: "Janaki",
    age: 75,
    gender: "Female",
    room: "B202",
    medicalHistory: "Asthma",
    allergies: "Pollen",
    medications: "Inhaler",
    diet: "Vegetarian",
    activity: "Bhajan",
    family: {
      name: "Karthik",
      relation: "Son",
      phone: "9090909090",
      email: "karthik@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  },
  {
    id: 5,
    name: "Valliyammal",
    age: 83,
    gender: "Male",
    room: "C301",
    medicalHistory: "Heart Surgery (2018)",
    allergies: "None",
    medications: "Blood Thinners",
    diet: "Low Salt",
    activity: "Chess",
    family: {
      name: "Sumathi",
      relation: "Daughter",
      phone: "9345678901",
      email: "sumathi@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  },
  {
    id: 6,
    name: "Kamala",
    age: 76,
    gender: "Female",
    room: "C302",
    medicalHistory: "Mild Memory Loss",
    allergies: "None",
    medications: "Vitamins",
    diet: "Soft Diet",
    activity: "Music Therapy",
    family: {
      name: "Vishnu",
      relation: "Son",
      phone: "9871209871",
      email: "vishnu@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  },
  {
    id: 7,
    name: "Parthasarathy",
    age: 80,
    gender: "Male",
    room: "D101",
    medicalHistory: "Hypertension",
    allergies: "None",
    medications: "BP Tablets",
    diet: "Low Salt",
    activity: "Temple Visit",
    family: {
      name: "Lakshmi",
      relation: "Wife",
      phone: "9080706050",
      email: "lakshmi@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  },
  {
    id: 8,
    name: "Saraswathi Amma",
    age: 79,
    gender: "Female",
    room: "D102",
    medicalHistory: "Arthritis",
    allergies: "None",
    medications: "Pain Relief",
    diet: "Vegetarian",
    activity: "Knitting",
    family: {
      name: "Arun",
      relation: "Son",
      phone: "9998887776",
      email: "arun@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  },
  {
    id: 9,
    name: "Balakrishnan",
    age: 82,
    gender: "Male",
    room: "E201",
    medicalHistory: "Diabetes",
    allergies: "None",
    medications: "Insulin",
    diet: "Low Sugar",
    activity: "Morning Walk",
    family: {
      name: "Manoj",
      relation: "Son",
      phone: "8887776665",
      email: "manoj@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  },
  {
    id: 10,
    name: "Indira",
    age: 74,
    gender: "Female",
    room: "E202",
    medicalHistory: "Healthy",
    allergies: "None",
    medications: "Multivitamins",
    diet: "Balanced",
    activity: "Storytelling",
    family: {
      name: "Deepa",
      relation: "Daughter",
      phone: "9001122334",
      email: "deepa@gmail.com"
    },
    notes: [],
    history: [],
    careChecklist: { morning: false, medication: false, activity: false, evening: false }
  }
];
const [residents, setResidents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
  fetch("http://localhost:5000/api/emergency")
    .then(res => res.json())
    .then(data => {
      const formatted = data.map(user => ({
        ...user,
        id: user._id
      }));

      setResidents(formatted);

      // AUTO SELECT FIRST RESIDENT
      if (formatted.length > 0) {
        setSelectedId(formatted[0].id);
      }
    });
}, []);

  const selected = residents.find(r => r.id === selectedId);

  const updateResident = (data) => {
    setResidents(residents.map(r =>
      r.id === selectedId ? { ...r, ...data } : r
    ));
  };

  const toggleChecklist = (field) => {
    const updatedChecklist = {
      ...selected.careChecklist,
      [field]: !selected.careChecklist[field]
    };

    updateResident({
      careChecklist: updatedChecklist,
      history: [
        ...selected.history,
        `Updated ${field} check at ${new Date().toLocaleString()}`
      ]
    });
  };

  const addNote = () => {
    if (!noteInput) return;

    updateResident({
      notes: [...selected.notes, noteInput],
      history: [
        ...selected.history,
        `Added note at ${new Date().toLocaleString()}`
      ]
    });

    setNoteInput("");
  };

  const sendAlert = () => {
    updateResident({
      history: [
        ...selected.history,
        `Emergency alert sent to ${selected.family.name} at ${new Date().toLocaleString()}`
      ]
    });

    alert("Emergency Alert Logged Successfully");
  };

 const filtered = residents.filter(r =>
  (r.name || "").toLowerCase().includes(search.toLowerCase())
);

  const totalResidents = residents.length;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* DASHBOARD HEADER */}
      <div className="bg-white p-6 shadow mb-6 flex justify-between">
        <h1 className="text-3xl font-semibold">
          Staff Management Dashboard
        </h1>

        <div className="flex gap-6">
          <div className="bg-gray-100 p-4 rounded text-center">
            <p className="text-xl font-bold">{totalResidents}</p>
            <p className="text-sm text-gray-600">Total Residents</p>
          </div>
        </div>
      </div>

      <div className="flex">

        {/* LEFT DIRECTORY */}
        <div className="w-1/4 bg-white border-r p-6">
          <h2 className="text-xl font-semibold mb-4">Residents</h2>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <div className="space-y-2">
            {filtered.map(resident => (
              <div
                key={resident.id}
                onClick={() => {
                  setSelectedId(resident.id);
                  setActiveTab("overview");
                }}
                className={`p-3 rounded cursor-pointer transition
                ${selectedId === resident.id ? "bg-gray-200" : "hover:bg-gray-100"}`}
              >
              {resident.name || "Unknown"}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-8">

          {!selected && (
            <p className="text-gray-500">
              Select a resident to view details.
            </p>
          )}

          {selected && (
            <div className="bg-white p-8 rounded shadow">

              <h2 className="text-2xl font-semibold mb-6">
                {selected.name}
              </h2>

              {/* TABS */}
              <div className="flex gap-6 border-b mb-6">
                {["overview", "care", "notes", "family"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 capitalize
                    ${activeTab === tab
                      ? "border-b-2 border-black font-semibold"
                      : "text-gray-500"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div>
                  <p><strong>Age:</strong> {selected.age}</p>
                  <p><strong>Gender:</strong> {selected.gender}</p>
                  <p><strong>Room:</strong> {selected.room}</p>
                  <p><strong>Medical History:</strong> {selected.medicalHistory}</p>
                  <p><strong>Allergies:</strong> {selected.allergies}</p>
                </div>
              )}

              {/* CARE TAB */}
              {activeTab === "care" && (
                <div>
                  <p><strong>Medications:</strong> {selected.medications}</p>
                  <p><strong>Diet:</strong> {selected.diet}</p>
                  <p><strong>Activity:</strong> {selected.activity}</p>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">
                      Daily Care Checklist
                    </h3>

                    {Object.entries(selected.careChecklist).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => toggleChecklist(key)}
                        />
                        <label className="capitalize">
                          {key} check
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NOTES TAB */}
              {activeTab === "notes" && (
                <div>
                  {selected.notes.map((note, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded mb-2">
                      {note}
                    </div>
                  ))}

                  <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="w-full border p-2 rounded mt-4"
                    placeholder="Add note..."
                  />

                  <button
                    onClick={addNote}
                    className="bg-black text-white px-4 py-2 rounded mt-2"
                  >
                    Add Note
                  </button>
                </div>
              )}

              {/* FAMILY TAB */}
              {activeTab === "family" && (
                <div>
                  <p><strong>Name:</strong> {selected.family.name}</p>
                  <p><strong>Relation:</strong> {selected.family.relation}</p>
                  <p><strong>Phone:</strong> {selected.family.phone}</p>
                  <p><strong>Email:</strong> {selected.family.email}</p>

                  <div className="flex gap-4 mt-4">
                    <a
                      href={`tel:${selected.family.phone}`}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Call
                    </a>

                    <a
                      href={`mailto:${selected.family.email}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Email
                    </a>

                    <button
                      onClick={sendAlert}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Send Alert
                    </button>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Activity History</h3>
                    {selected.history.map((h, i) => (
                      <div key={i} className="text-sm text-gray-600 mb-1">
                        • {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default StaffPortal;
