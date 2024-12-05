import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { InsuranceFormData, FormErrors } from "../../types/insurance";
import InsurancePurpose from "./InsurancePurpose";
import VehicleRegistration from "./VehicleRegistration";
import LoadingOverlay from "../LoadingOverlay";
import { validateInsuranceForm } from "./validation";

const InsuranceFormContainer: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<InsuranceFormData>({
    purpose: "new",
    vehicleType: "registration",
    fullName: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Effect to enforce vehicle type constraints based on purpose
  useEffect(() => {
    setFormData((prev) => {
      // If purpose is transfer, force vehicle type to registration
      if (prev.purpose === "transfer") {
        return { ...prev, vehicleType: "registration" };
      }

      // If purpose is new and vehicle type was forced to registration,
      // allow user to choose again
      return prev;
    });
  }, [formData.purpose]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateInsuranceForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem("insuranceFormData", JSON.stringify(formData));
      console.log("Form submitted:", formData);
      navigate("/insurance-details");
    } finally {
      setIsLoading(false);
    }
  };

  const setFormDataWithConstraints = (
    updater:
      | ((prev: InsuranceFormData) => InsuranceFormData)
      | InsuranceFormData
  ) => {
    setFormData((prev) => {
      const newData = typeof updater === "function" ? updater(prev) : updater;

      if (newData.purpose === "transfer") {
        newData.vehicleType = "registration";
      }

      return newData;
    });
  };

  return (
    <>
      <LoadingOverlay isVisible={isLoading} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 -mt-24 relative z-20"
      >
        <div className="container mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 md:p-10 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <InsurancePurpose
                formData={formData}
                setFormData={setFormDataWithConstraints}
                errors={errors}
              />
              <VehicleRegistration
                formData={formData}
                setFormData={setFormDataWithConstraints}
                errors={errors}
                disabled={formData.purpose === "transfer"}
              />
            </div>

            <div className="mt-6 md:mt-8 pt-4 border-t-2 border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      setFormDataWithConstraints((prev) => ({
                        ...prev,
                        agreeToTerms: e.target.checked,
                      }))
                    }
                    className="form-checkbox h-5 w-5 text-[#146394] rounded"
                  />
                  <span className="text-[#146394] font-medium">
                    أوافق على منح حق الاستعلام
                  </span>
                </label>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full md:w-auto bg-[#146394] text-white font-bold py-3 px-10 rounded-lg
                    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  متابعة
                </motion.button>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm mt-2 text-center md:text-right">
                  {errors.agreeToTerms}
                </p>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};
export default InsuranceFormContainer;