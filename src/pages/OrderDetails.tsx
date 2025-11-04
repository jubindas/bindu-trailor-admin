import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { User, Shirt, Ruler, Image as ImageIcon } from "lucide-react";

const orderDetail = {
  customer: {
    name: "Jubin Rohidas",
    phoneNo: "9876543210",
    address: "Nazira, Assam, India",
    notes: "Customer prefers slim fit style and dark wash fabric.",
  },
  garmentType: "Jeans",
  tamplateDesignImg:
    "https://i.pinimg.com/1200x/f4/d3/16/f4d316643d03d8a1f24a8a02639e481b.jpg",
  fabricSource: "In-house stock",
  materialCode: "FAB-00123",
  stockQuantity: "120 meters",
  unitOfMesurment: "meters",
  quantity: "3",
  spacialDesignRemarks:
    "Add double-stitching on pockets and leather patch on the back.",
  measurements: {
    lentgh: "42 inches",
    waist: "32 inches",
    hip: "38 inches",
    high: "10 inches",
    thigh: "22 inches",
    bottom: "14 inches",
  },
  userUploadImg:
    "https://i.pinimg.com/1200x/37/ba/07/37ba079f16a576dc0a3d730e82b4ae3c.jpg",
  deadline: "2025-11-20",
};

export default function OrderDetails() {
  return (
    <div className="w-full min-h-screen p-10 flex justify-center bg-linear-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl w-full bg-[#1F2937] shadow-2xl rounded-3xl p-10 space-y-10 border border-gray-700">
        <h1 className="text-4xl font-bold text-purple-400 border-b pb-5 flex items-center gap-3">
          <Shirt size={32} /> Order Details
        </h1>

        {/* Customer Info */}
        <div className="bg-gray-200 p-6 rounded-2xl shadow-md border border-gray-300">
          <h2 className="font-semibold text-xl mb-4 text-purple-900 flex items-center gap-2">
            <User /> Customer Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-900 text-lg">
            <p>
              <strong>Name:</strong> {orderDetail.customer.name}
            </p>
            <p>
              <strong>Phone:</strong> {orderDetail.customer.phoneNo}
            </p>
            <p className="sm:col-span-2">
              <strong>Address:</strong> {orderDetail.customer.address}
            </p>
            <p className="sm:col-span-2">
              <strong>Notes:</strong> {orderDetail.customer.notes}
            </p>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-gray-200 p-6 rounded-2xl shadow-md border border-gray-300">
          <h2 className="font-semibold text-xl mb-4 text-purple-900 flex items-center gap-2">
            <Shirt /> Order Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-900 text-lg">
            <p>
              <strong>Garment Type:</strong> {orderDetail.garmentType}
            </p>
            <p>
              <strong>Fabric Source:</strong> {orderDetail.fabricSource}
            </p>
            <p>
              <strong>Material Code:</strong> {orderDetail.materialCode}
            </p>
            <p>
              <strong>Stock Quantity:</strong> {orderDetail.stockQuantity}
            </p>
            <p>
              <strong>Unit:</strong> {orderDetail.unitOfMesurment}
            </p>
            <p>
              <strong>Quantity:</strong> {orderDetail.quantity}
            </p>
            <p className="sm:col-span-2">
              <strong>Special Remarks:</strong>{" "}
              {orderDetail.spacialDesignRemarks}
            </p>
            <p>
              <strong>Deadline:</strong> {orderDetail.deadline}
            </p>
          </div>
        </div>

        {/* Images Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Template Image */}
          <div className="space-y-3">
            <h2 className="font-semibold text-xl text-purple-400 flex items-center gap-2">
              <ImageIcon /> Template Design
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={orderDetail.tamplateDesignImg}
                  alt="Template"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg cursor-zoom-in hover:opacity-80 transition border border-gray-600"
                />
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0 bg-transparent shadow-none border-none">
                <img
                  src={orderDetail.tamplateDesignImg}
                  alt="Template Full View"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* User Uploaded Image */}
          <div className="space-y-3">
            <h2 className="font-semibold text-xl text-purple-400 flex items-center gap-2">
              <ImageIcon /> Uploaded Image
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={orderDetail.userUploadImg}
                  alt="User Upload"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg cursor-zoom-in hover:opacity-80 transition border border-gray-600"
                />
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0 bg-transparent shadow-none border-none">
                <img
                  src={orderDetail.userUploadImg}
                  alt="User Upload Full View"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Measurements */}
        <div className="bg-gray-200 p-6 rounded-2xl shadow-md border border-gray-300">
          <h2 className="font-semibold text-xl mb-4 text-purple-900 flex items-center gap-2">
            <Ruler /> Measurements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-900 text-lg">
            {Object.entries(orderDetail.measurements).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
