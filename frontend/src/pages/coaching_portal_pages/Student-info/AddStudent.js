import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../../../components/FormComponents/FormikControl";
import "./AddStudent.css";
import axios from 'axios';

function AddStudent() {
  const history = useHistory();
  
  const batchDropDownOptions = [
    { key: "Select a batch", value: "" },
    { key: "batch 1", value: "batch1" },
    { key: "batch 2", value: "batch2" },
    { key: "batch 3", value: "batch3" },
  ];
  const GenderradioOptions = [
    { key: "male", value: "male" },
    { key: "female", value: "female" },
  ];
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",    
    selectBatchOption: "",
    GenderRadioOption: "",
    guardianName: "",
    guadianMobileNumber: "",
    address: "",
    state: "",
    city: "",
    birthDate: null,
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email Format").required("Required"),
    mobileNumber: Yup.string().required("Required"),
    selectBatchOption: Yup.string().required("Required"),    
    GenderRadioOption: Yup.string().required("Required"),
    guardianName: Yup.string().required("Required"),
    guardianMobileNumber: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),

    birthDate: Yup.date().required("Required").nullable(),
  });
  const onSubmit = (values) => {
    console.log("Form data", values);
    console.log("Saved data", JSON.parse(JSON.stringify(values)));
   // const newStudent=JSON.parse(JSON.stringify(values));

    const newStudent={
      firstName:values.firstName,
    lastName:values.lastName,
    email:values.email,
    mobileNumber:values.mobileNumber,    
    batch:values.selectBatchOption,
    gender:values.GenderRadioOption,
    guardianName:values.guardianName,
    guadianMobileNumber:values.guardianMobile,
    address:values.address,
    state:values.state,
    city:values.city,
    birthDate: values.birthDate,

    }
    try{
      axios.post('http://localhost:8000/addStudent',newStudent);
    }catch(err){
      console.log(err)
    }
    

    
    history.push("/student_Info")

  };

  return (
    <div className="AddStudent">
      <h1 style={{ textAlign: "center" }}>New Student Registration</h1>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <Row>
                <Col>
                  <FormikControl
                    control="input"
                    type="text"
                    label="First Name"
                    name="firstName"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Last Name"
                    name="lastName"
                  />
                  <FormikControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Mobile Number"
                    name="mobileNumber"
                  />
                  
                  <FormikControl
                    control="select"
                    label="Select a Batch"
                    name="selectBatchOption"
                    options={batchDropDownOptions}
                  />
                  <FormikControl
                    control="radio"
                    label="Gender"
                    name="GenderRadioOption"
                    options={GenderradioOptions}
                  />

                  <FormikControl
                    control="date"
                    label="pick date of birth"
                    name="birthDate"
                  />
                </Col>
              
                <Col>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Guardian Name"
                    name="guardianName"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Guardian Mobile Number"
                    name="guardianMobileNumber"
                  />
                
                  <FormikControl
                    control="textarea"
                    label="Address"
                    name="address"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="State"
                    name="state"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="City"
                    name="city"
                  />
                </Col>
              </Row>
              <Row style={{justifyContent:'right'}}>
              <button type="submit" className="btn btn-primary">
                REGISTER
              </button>
              </Row>

              
              
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default AddStudent;
