import React, { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { getCategories } from "@/app/api/admin/categories";
import { PromoCodeProps } from "@/Types/Course.type";
import { Category } from "@/Types/Category.type";
import { createPromoCode } from "@/app/api/admin/promo-codes";

interface PromoCodeCreationFormProps {
  toggle: () => void;
  fetchData: () => Promise<void>;
}

const PromoCodeCreationForm = ({
  toggle,
  fetchData,
}: PromoCodeCreationFormProps) => {
  const [formData, setFormData] = useState<PromoCodeProps>({
    code: "",
    discountPercentage: 0,
    expiryDate: "",
    applicableTo: "Universal",
    usageLimit: 1,
    category: null,
    usedCount:0
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createPromoCode(formData);
      toast.success("Promo Code created successfully!");
      fetchData();
      toggle();
    } catch (error) {
      console.error("Error creating promo code:", error);
      toast.error("Failed to create promo code.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "discountPercentage" || name === "usageLimit" ? +value : value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col md={12}>
          <Label htmlFor="code">Promo Code</Label>
          <Input
            id="code"
            name="code"
            type="text"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter promo code"
            required
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="discountPercentage">Discount Percentage</Label>
          <Input
            id="discountPercentage"
            name="discountPercentage"
            type="number"
            value={formData.discountPercentage}
            onChange={handleChange}
            placeholder="Enter discount percentage"
            required
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="applicableTo">Applicable To</Label>
          <Input
            id="applicableTo"
            name="applicableTo"
            type="select"
            value={formData.applicableTo}
            onChange={handleChange}
            required
          >
            <option value="Universal">Universal</option>
            <option value="Category">Category</option>
          </Input>
        </Col>
        {formData.applicableTo === "Category" && (
          <Col md={6}>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              type="select"
              value={formData.category?._id || ""}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Input>
          </Col>
        )}
        <Col md={6}>
          <Label htmlFor="usageLimit">Usage Limit</Label>
          <Input
            id="usageLimit"
            name="usageLimit"
            type="number"
            value={formData.usageLimit}
            onChange={handleChange}
            placeholder="Enter usage limit"
            required
          />
        </Col>
        <Col md={12}>
          <Button color="primary" type="submit">
            Create Promo Code
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PromoCodeCreationForm;
