"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store";
import { resetForm, updateField } from "@/store/slices/feedbackSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FeedbackForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.feedback);
  const { t } = useTranslation();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    dispatch(updateField({ field, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement feedback submission with API
    alert(t("feedback.alerts.success"));
    dispatch(resetForm());
  };

  return (
    <div className="min-h-screen pt-40 bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {t("feedback.pageTitle")}
        </h1>
        <p className="text-gray-600 mb-8">{t("feedback.pageDescription")}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">{t("feedback.fullName")}</Label>
            <Input
              id="fullName"
              type="text"
              placeholder={t("feedback.placeholder.fullName")}
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              required
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">{t("feedback.phoneNumber")}</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder={t("feedback.placeholder.phoneNumber")}
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("feedback.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("feedback.placeholder.email")}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Visit Date & Hospital */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="visitDate">{t("feedback.visitDate")}</Label>
              <Input
                id="visitDate"
                type="date"
                placeholder={t("feedback.placeholder.visitDate")}
                value={formData.visitDate}
                onChange={(e) => handleInputChange("visitDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospital">{t("feedback.hospital")}</Label>
              <Select
                value={formData.hospital}
                onValueChange={(value) => handleInputChange("hospital", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t("feedback.placeholder.hospital")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta">
                    {t("feedback.hospitalOptions.jakarta")}
                  </SelectItem>
                  <SelectItem value="bandung">
                    {t("feedback.hospitalOptions.bandung")}
                  </SelectItem>
                  <SelectItem value="surabaya">
                    {t("feedback.hospitalOptions.surabaya")}
                  </SelectItem>
                  <SelectItem value="medan">
                    {t("feedback.hospitalOptions.medan")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Patient Type & Service Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="patientType">{t("feedback.patientType")}</Label>
              <Select
                value={formData.patientType}
                onValueChange={(value) =>
                  handleInputChange("patientType", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t("feedback.placeholder.patientType")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outpatient">
                    {t("feedback.patientTypeOptions.outpatient")}
                  </SelectItem>
                  <SelectItem value="inpatient">
                    {t("feedback.patientTypeOptions.inpatient")}
                  </SelectItem>
                  <SelectItem value="emergency">
                    {t("feedback.patientTypeOptions.emergency")}
                  </SelectItem>
                  <SelectItem value="mcu">
                    {t("feedback.patientTypeOptions.mcu")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType">
                {t("feedback.serviceType")}{" "}
                <span className="text-gray-500 text-sm">
                  {t("feedback.serviceTypeHint")}
                </span>
              </Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) =>
                  handleInputChange("serviceType", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t("feedback.placeholder.serviceType")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">
                    {t("feedback.serviceTypeOptions.general")}
                  </SelectItem>
                  <SelectItem value="dental">
                    {t("feedback.serviceTypeOptions.dental")}
                  </SelectItem>
                  <SelectItem value="children">
                    {t("feedback.serviceTypeOptions.children")}
                  </SelectItem>
                  <SelectItem value="maternity">
                    {t("feedback.serviceTypeOptions.maternity")}
                  </SelectItem>
                  <SelectItem value="cardiology">
                    {t("feedback.serviceTypeOptions.cardiology")}
                  </SelectItem>
                  <SelectItem value="radiology">
                    {t("feedback.serviceTypeOptions.radiology")}
                  </SelectItem>
                  <SelectItem value="laboratory">
                    {t("feedback.serviceTypeOptions.laboratory")}
                  </SelectItem>
                  <SelectItem value="pharmacy">
                    {t("feedback.serviceTypeOptions.pharmacy")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">{t("feedback.message")}</Label>
            <Textarea
              id="message"
              rows={6}
              placeholder={t("feedback.placeholder.message")}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg"
            >
              {t("feedback.submitButton")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
