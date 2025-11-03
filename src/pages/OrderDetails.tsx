/* eslint-disable @typescript-eslint/no-explicit-any */

export default function OrderDetails({ garmentData }: any) {

  if (!garmentData) {
    return (
      <div className="text-center text-gray-400 mt-10 text-sm">
        No garment details found.
      </div>
    );
  }

  const {
    orderId,
    metarial,
    garmentType,
    basePrice,
    fabricSource,
    materialRate,
    quantity,
    additionalPrice,
    remarks,
  } = garmentData;

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-gray-100 p-6">
      <div className="w-full max-w-3xl bg-[#1e293b] rounded-xl shadow-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-semibold text-purple-400 mb-6 text-center">
          Garment Order Details
        </h2>

        <p className="mb-5 w-40">Order ID: {orderId}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <DetailItem label="Material" value={metarial} />
          <DetailItem label="Garment Type" value={garmentType} />
          <DetailItem label="Fabric Source" value={fabricSource} />
          <DetailItem label="Base Price" value={`₹${basePrice}`} />
          <DetailItem label="Material Rate / Unit" value={`₹${materialRate}`} />
          <DetailItem label="Quantity" value={quantity} />
          <DetailItem label="Additional Price" value={`₹${additionalPrice}`} />
        </div>

        <div className="bg-[#111827] rounded-lg p-4 mb-6">
          <h3 className="text-sm text-gray-400 mb-1">Special Design Remarks</h3>
          <p className="text-gray-200 text-sm whitespace-pre-line">
            {remarks || "No remarks added"}
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: any) {
  return (
    <div className="bg-[#111827] rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-100">{value || "—"}</p>
    </div>
  );
}
