import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const PersonelSchema = Yup.object().shape({
    fullName: Yup.number
});