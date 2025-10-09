export default function SelfPrimingPumpCard() {
  const pumpData = {
    title: "SELF PRIMING MONOBLOC PUMP",
    description: "High-quality product for your needs.",
    image: "/pump.png", // <-- place your image in /public folder
    options: ["HP: 0.5", "HP: 1", "HP: 1.5", "HP: 2"],
    specs: [
      { label: "Speed", value: "2780 rpm" },
      { label: "Power", value: "0.5 HP, 1 HP, 1.5 HP, 2 HP" },
      { label: "Voltage range", value: "180v–240v (1ph)—50 HZ" },
      { label: "Duty", value: "S1 (continuous)" },
      { label: "Protection", value: "IP44" },
      { label: "Insulation", value: "B class" },
      { label: "Pipe size", value: "25×25 mm" },
      { label: "Head range", value: "6–50 mtr" },
      { label: "Flow range", value: "8–60 lpm" },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 p-6 md:p-10 mt-8">
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
            <img
              src={pumpData.image}
              alt={pumpData.title}
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="md:col-span-2 space-y-5">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {pumpData.title}
          </h1>
          <p className="text-gray-600">{pumpData.description}</p>

          {/* Options */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">
              Available Options:
            </h2>
            <div className="flex flex-wrap gap-3">
              {pumpData.options.map((opt) => (
                <button
                  key={opt}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-3">
              Technical Specifications:
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 text-gray-700">
              {pumpData.specs.map((item) => (
                <Spec key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              View Details
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for specs
function Spec({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-100 pb-1">
      <span className="font-medium text-gray-800">{label}</span>
      <span>{value}</span>
    </div>
  );
}
