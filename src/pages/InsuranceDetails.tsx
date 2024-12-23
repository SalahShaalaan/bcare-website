import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateField } from "../redux/slices/insuranceDetailsSlice";
import { Link, useNavigate } from "react-router-dom";

type InsuranceType = "against-others" | "special" | "comprehensive";
type VehicleUse =
  | "personal"
  | "commercial"
  | "rental"
  | "ride-sharing"
  | "goods"
  | "oil-transport";
type RepairLocation = "workshop" | "agency";

const insuranceTypes = [
  { id: "against-others", label: "ضد الغير" },
  { id: "special", label: "مميز" },
  { id: "comprehensive", label: "شامل" },
];

const vehicleUseOptions = [
  { value: "personal", label: "شخصي" },
  { value: "commercial", label: "تجاري" },
  { value: "rental", label: "تأجير" },
  { value: "ride-sharing", label: "نقل الاركاب أو كريم-أوبر" },
  { value: "goods", label: "نقل بضائع" },
  { value: "oil-transport", label: "نقل مشتقات نفطية" },
];

export const InsuranceDetails = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.insuranceDetails);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const generateYearOptions = () => {
    return Array.from(
      { length: currentYear - 1929 },
      (_, i) => currentYear - i
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreeToTerms) {
      dispatch(updateField(formData));
      navigate("/offers");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-lg bg-opacity-95">
          <h1 className="text-2xl md:text-3xl font-bold text-right mb-6 md:mb-8 text-[#146394]">
            بيانات التأمين
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Insurance Type Selection */}
            <div className="space-y-3">
              <label className="block text-right font-medium text-[#146394]">
                نوع التأمين
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {insuranceTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateField({ insuranceType: type.id as InsuranceType })
                      )
                    }
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      formData.insuranceType === type.id
                        ? "bg-[#146394] text-white border-[#146394]"
                        : "border-gray-200 hover:border-[#146394] text-[#146394]"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="block text-right font-medium text-[#146394]">
                تاريخ بدء الوثيقة
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  dispatch(updateField({ startDate: e.target.value }))
                }
                className="w-full p-3 md:p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-[#146394] transition-all outline-none"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Vehicle Use */}
            <div className="space-y-2">
              <label className="block text-right font-medium text-[#146394]">
                الغرض من إستخدام المركبة
              </label>
              <select
                value={formData.vehicleUse}
                onChange={(e) =>
                  dispatch(
                    updateField({ vehicleUse: e.target.value as VehicleUse })
                  )
                }
                className="w-full p-3 md:p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-[#146394] transition-all outline-none appearance-none bg-white rtl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23146394'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: "left 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5rem",
                }}
              >
                <option value="">إختر</option>
                {vehicleUseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Value */}
            <div className="space-y-2">
              <label className="block text-right font-medium text-[#146394]">
                القيمة التقديرية للمركبة
              </label>
              <input
                type="number"
                value={formData.estimatedValue}
                onChange={(e) =>
                  dispatch(updateField({ estimatedValue: e.target.value }))
                }
                className="w-full p-3 md:p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-[#146394] transition-all outline-none"
                min="0"
              />
            </div>

            {/* Manufacturing Year */}
            <div className="space-y-2">
              <label className="block text-right font-medium text-[#146394]">
                سنة الصنع
              </label>
              <select
                value={formData.manufacturingYear}
                onChange={(e) =>
                  dispatch(updateField({ manufacturingYear: e.target.value }))
                }
                className="w-full p-3 md:p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-[#146394] transition-all outline-none appearance-none bg-white rtl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23146394'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: "left 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5rem",
                }}
              >
                <option value="">إختر</option>
                {generateYearOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Repair Location */}
            <div className="space-y-2">
              <label className="block text-right font-medium text-[#146394]">
                مكان الإصلاح
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: "workshop", label: "الورشة" },
                  { id: "agency", label: "الوكالة" },
                ].map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateField({
                          repairLocation: location.id as RepairLocation,
                        })
                      )
                    }
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      formData.repairLocation === location.id
                        ? "bg-[#146394] text-white border-[#146394]"
                        : "border-gray-200 hover:border-[#146394] text-[#146394]"
                    }`}
                  >
                    {location.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-all duration-300">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  dispatch(updateField({ agreeToTerms: e.target.checked }))
                }
                className="w-5 h-5 mt-1 rounded border-2 border-[#146394] text-[#146394] focus:ring-[#146394]"
              />
              <label
                htmlFor="terms"
                className="text-right text-sm text-[#146394]"
              >
                أوافق على منح شركة عناية الوسيط الحق في الاستعلام من شركة نجم
                و/أو مركز المعلومات الوطني عن بياناتي
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.agreeToTerms}
              className="w-full bg-[#146394] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#0f4c70] transition-all transform hover:scale-[0.99] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Link to="/offers">اظهار العروض</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
