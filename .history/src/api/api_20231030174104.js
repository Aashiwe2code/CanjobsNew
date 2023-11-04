import axios from "axios";
// const API_URL = "https://192.168.29.92/canjobs/";
// const API_URL = "http://65.0.20.158/canjobs/";
const API_URL = "https://apnaorganicstore.in/canjobs/";
// const API_URL = "http://51.20.6.80/canjobs/";
// const API_URL = "http://192.168.29.92/canjobs_october/";
//new aws backend
// const API_URL = "https://api.canpathwaysjobs.com/canjobs/";
let Token = localStorage.getItem("token");
const view_as_token = localStorage.getItem("view_as_token");
const user_id = localStorage.getItem("employee_id");
const employer_id = localStorage.getItem("company_id");
const admin_id = localStorage.getItem("admin_id");
const user_type = localStorage.getItem("userType");

if (view_as_token) {
  Token = view_as_token;
}

// Location Api
/*Country*/
export const GetCountry = async () => {
  const response = await axios.get(`${API_URL}getCountryList`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Chanage password Api */
export const ChangePasswordApi = async (props) => {
  const response = await axios.put(
    `${API_URL}${user_type}/changePassword`,
    props,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Sen Otp to email api */
export const SendOtp = async (props, type) => {
  const response = await axios.post(`${API_URL}common/generateOtp`, {
    email: props.email,
    type: type,
  });
  return response.data;
};

/*Employee Reset password Api */
export const EmployeeResetPasswordApi = async (props) => {
  const response = await axios.put(`${API_URL}user/resetPassword`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*To get the filter list APi */
export const getJson = async () => {
  const response = await axios.get(`${API_URL}filterList/filterList.json`);
  return response.data;
};

// EMPLOYEE'S API
/*Employee sign */
export const EmployeeSignUp = async (props, permission) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("otp", props.otp);
  formData.append("resume", props.resume);
  formData.append("reffer_by", props.reffer_by);
  formData.append("name", props.name);
  formData.append("contact_no", props.contact_no);
  formData.append("permission", JSON.stringify(permission));
  console.log(permission);
  const response = await axios.post(`${API_URL}employee_signup`, formData);
  return response.data;
};

/*Employee Login */
export const EmployeeLogin = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  const response = await axios.post(`${API_URL}employee_login`, formData);
  return response.data;
};

/*Api to login in with linked employee*/
export const LinkedInLogin = async (props, type) => {
  if (type === "employeeLogin") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(
      `${API_URL}api/Common_controller/linkedinLogin`,
      formData
    );
    return response.data;
  }
};

/*Api to login in with linked employee*/
export const LinkedSignup = async (props, type) => {
  if (type === "employeeSignup") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(
      `${API_URL}api/Common_controller/linkedinLogin`,
      formData
    );
    return response.data;
  }
};

/*Api to login in with Social linkes in employee login*/
export const SocialLogin = async (token, email, name, picture, type) => {
  const response = await axios.post(
    `${API_URL}user/signupLoginViaSocialMedia`,
    {
      token: token,
      email: email,
      name: name,
      picture: picture,
      type: type,
    }
  );
  return response.data;
};

/*Employee Forgot passsword api */
export const EmployeeForgotPassword = async (props) => {
  const response = await axios.post(`${API_URL}employee/ForgetPassword`, {
    forget_email: props.forget_email,
  });
  return response.data;
};
/*Employee detail api */
export const EmployeeDetails = async (props) => {
  const formData = new FormData();
  formData.append("employee_id", user_id);
  const response = await axios.post(
    `${API_URL}getEmployeeDetail`,
    { employee_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
  // }
};
/*Employee detail api */
export const EmployeeAppliedJob = async (props) => {
  const response = await axios.post(
    `${API_URL}getJobsByEmployee`,
    { employee_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employee detail api */
export const AddEmployeeDetails = async (props) => {
  const response = await axios.put(`${API_URL}employeePersonal_detail`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token
        ? Token
        : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbl9pZCI6IjM0IiwiZW1haWwiOiJ0b2tlbkBnbWFpbC5jb20iLCJ1c2VyX3R5cGUiOiJzdXBlci1hZG1pbiIsIkFQSV9USU1FIjoxNjk3ODE5MjU3fQ.KMcaHwbumy5SQSOlhgTE5v7qsDD30NDeXjcl2LE6dKM",
    },
  });
  return response.data;
};
/*Employee List Api */
export const getallEmployeeData = async (
  search,
  experience,
  skill,
  education,
  page,
  limit,
  column,
  sort,
  time,
  jobSkill,
  status,
  job_id,
  categorye,
  inserted,
  candian,
  agentId
) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getallEmployeeView`,
    {
      user_type: user_type,
      filter_experience: experience,
      filter_skill: skill,
      filter_education: education,
      search: search,
      page: page,
      limit: limit,
      column_name: column,
      sort_order: sort,
      filter_by_time: time,
      job_keyskills: jobSkill,
      filter_status: status,
      job_id: job_id,
      work_permit_canada: candian,
      interested_in: inserted,
      agent_id: agentId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Detail Employee Education Api */
export const EmployeeEducationDetails = async (props) => {
  const formData = new FormData();
  formData.append("employee_id", props);
  const response = await axios.get(
    `${API_URL}getEmployeeEducation?employee_id=${props}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employee Education Api */
export const AddEmployeeEducation = async (props, id) => {
  const response = await axios.put(
    `${API_URL}employeeEducation_detail`,
    {
      employee_id: id,
      course: props.course,
      institute_location: props.institute_location,
      passing_year: props.passing_year,
      qualification: props.qualification,
      specialization: props.specialization,
      university_institute: props.university_institute,
      education_id: props.education_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Detail Employee Skill Api */
export const EmployeeSkillDetails = async (props) => {
  const formData = new FormData();
  formData.append("employee_id", props);
  const response = await axios.get(
    `${API_URL}getEmployeeSkill?employee_id=${props}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employee Career Api */
export const AddEmployeement = async (props, id) => {
  const response = await axios.put(
    `${API_URL}employeeCareer_detail`,
    {
      employee_id: id,
      company: props.company,
      designation: props.designation,
      company_location: props.company_location,
      industry: props.industry,
      functional_area: props.functional_area,
      work_level: props.work_level,
      start_date: props.start_date,
      end_date: props.end_date,
      currently_work_here: props.currently_work_here,
      career_id: props.career_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employee Skill Api */
export const AddEmployeeSkill = async (props, id) => {
  const response = await axios.post(
    `${API_URL}/employeeSkill`,
    {
      employee_id: id,
      skill: props.skill,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Employee Skill Api */
export const DeleteEmployeeSkill = async (props) => {
  const response = await axios.post(
    `${API_URL}deleteEmployeeSkill`,
    { skill_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Employee Education Api */
export const DeleteEmployeeEducation = async (props) => {
  const response = await axios.post(
    `${API_URL}deleteEmployeeEducation`,
    { education_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Employee Career Api */
export const DeleteEmployeeCareer = async (props) => {
  const response = await axios.post(
    `${API_URL}deleteEmployeeCareer`,
    { career_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Employee Profile completion Api*/
export const getProfileCompletionPercent = async () => {
  const response = await axios.get(`${API_URL}/getProfileCompletePercent`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data.data;
};

/*Apply job Api */
export const ApplyJob = async (job_id, employee_id, status, apply_id) => {
  const response = await axios.post(
    `${API_URL}applyJob`,
    {
      apply_id: apply_id,
      job_id: job_id,
      employee_id: employee_id,
      status: status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*single job data api */
export const GetJob = async (props) => {
  const response = await axios.post(
    `${API_URL}getJob`,
    { job_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*single job Detail api */
export const GetJobDetail = async (props) => {
  // // console.log(props);
  const response = await axios.post(
    `${API_URL}admin/jobDetail`,
    { job_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};
/*Api to get list of the Document */
export const GetEmployeeDocumentList = async (id, type) => {
  const response = await axios.post(
    `${API_URL}user/getDocumentsUploaded`,
    {
      employee_id: id,
      type: type,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Api to upload document*/
export const UploadDocument = async (id, type, doc, docId) => {
  const response = await axios.put(
    `${API_URL}user/documentsUpload `,
    {
      employee_id: id,
      type: type,
      document_file: doc,
      is_varify: "0",
      id: docId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Api to verify Applicants document */
export const VarifyDocument = async (id, verify) => {
  const response = await axios.put(
    `${API_URL}user/isVarify `,
    {
      is_varify: verify,
      id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Api to Add update visa */
export const AddUpdateVisa = async (employee_id, state, id) => {
  // /job_detail(employee_id, state, id)
  const response = await axios.put(
    `${API_URL}addUpdateVisa `,
    {
      employee_id: employee_id,
      id: id,
      country: state.country,
      status: state.status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};
/*Api to get Visa List */
export const GetEmployeeVisaList = async (
  search,
  status,
  country,
  interested,
  page,
  limit,
  column,
  sort,
  id
) => {
  const response = await axios.post(
    `${API_URL}getVisa`,
    {
      search: search,
      filter_by_interested_in: interested,
      filter_by_visa_country: country,
      filter_by_visa_status: status,
      filter_by_employee_id: id,
      page: page,
      limit: limit,
      column_name: column,
      sort_order: sort,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};
/*Api to get Visa Sub stage List */
export const GetVisaSubStages = async (misc_id, type, id) => {
  const response = await axios.post(
    `${API_URL}common/getMiscellaneousSubstage`,
    {
      id: id,
      filter_by_misc_id: misc_id,
      filter_by_type: type,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};
/*Api to add update visa sub stage */
export const AddUpdateEmployeeVisaSubStage = async (json) => {
  const response = await axios.put(
    `${API_URL}common/addUpdateMiscellaneousSubstage`,
    json,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Visa api */
export const DeleteVisa = async (id) => {
  const response = await axios.post(
    `${API_URL}deleteVisa`,
    {
      id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

// EMPLOYER'S API
/*Employer sign up */
export const EmployerSignUp = async (props, permission) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("contact_no", props.contact_no);
  formData.append("term_and_condition", props.term_and_condition);
  formData.append("otp", props.otp);
  formData.append("permission", JSON.stringify(permission));
  const response = await axios.post(`${API_URL}employer_signup`, formData);
  return response.data;
};
/*Employer Login */
export const EmployerLogin = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("remember", props.remember);
  const response = await axios.post(`${API_URL}employer_login`, formData);
  return response.data;
};

/*Api to login in with linked employer*/
export const LinkedInLoginEmployer = async (props, type) => {
  if (type === "employerLogin") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(
      `${API_URL}api/Common_controller/linkedinLogin`,
      formData
    );
    return response.data;
  }
};

/*Api to login in with linked  employer*/
export const LinkedInSignupEmployer = async (props, type) => {
  if (type === "employerSignup") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(
      `${API_URL}api/Common_controller/linkedinLogin`,
      formData
    );
    return response.data;
  }
};

/*Api to login in with Social linkes in employer login*/
export const SocialCompanyLogin = async (token, email, name, picture, type) => {
  const response = await axios.post(
    `${API_URL}company/signupLoginViaSocialMedia`,
    {
      token: token,
      email: email,
      name: name,
      picture: picture,
      type: type,
    }
  );
  return response.data;
};

/*Employer Reset password Api */
export const EmployerResetPasswordApi = async (props) => {
  const response = await axios.put(`${API_URL}company/resetPassword`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Employer Forgot passsword api */
export const EmployerForgotPassword = async (props) => {
  const response = await axios.post(`${API_URL}company/forgetPassword`, {
    forget_email: props.forget_email,
  });
  return response.data;
};

/*Response List Api */
export const GetAllResponse = async (
  job_id,
  filter_skill,
  filter_experience,
  search,
  page,
  limit,
  column,
  sort,
  time,
  lima,
  status,
  employee_id,
  reserved_status
) => {
  const response = await axios.post(
    `${API_URL}getJobResponse`,
    {
      job_id: job_id,
      user_type: user_type,
      page: page,
      limit: limit,
      filter_experience: filter_experience,
      filter_skill: filter_skill,
      column_name: column,
      sort_order: sort,
      search: search,
      filter_by_time: time,
      filter_lmia_status: lima,
      filter_employee_status: status,
      filter_employee_id: employee_id,
      filter_is_reserve: reserved_status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};
/*Delete Response api */
export const DeletRespone = async (apply_id, employee_id) => {
  const response = await axios.post(
    `${API_URL}deleteApplyJob`,
    {
      apply_id: apply_id,
      employee_id: employee_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get all job data */
export const GetAllJobs = async (
  search,
  location,
  category,
  skill,
  job,
  page,
  limit,
  column_name,
  sort_order,
  company,
  time,
  id,
  selfValue,
  adminValue,
  reserved,
  // employeeSkill,
  cid,
  manager_id
) => {
  const response = await axios.post(
    Token ? `${API_URL}getAllJobs` : `${API_URL}common/getJobs`,
    {
      filter_category_id: category,
      filter_job_swap: job,
      filter_keyskill: skill,
      filter_location: location,
      page: page,
      search: search ? search : company,
      limit: limit,
      column_name: column_name,
      sort_order: sort_order,
      filter_by_time: time,
      job_id: id,
      // filter_company_name: company,
      filter_applied_by_self: selfValue,
      filter_applied_by_admin: adminValue,
      filter_reserved_employee: reserved,
      // employee_skills: employeeSkill,
      filter_company_id: cid,
      manager_id: manager_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Add Job  Api */
export const AddJob = async (props) => {
  const response = await axios.put(`${API_URL}addJobs`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Employer List Api */
export const getAllEmployer = async (
  industry,
  corporation,
  search,
  page,
  limit,
  column,
  sort,
  time
) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getAllEmployer`,
    {
      filter_industry: industry,
      filter_corporation: corporation,
      search: search,
      page: page,
      limit: limit,
      column_name: column,
      sort_order: sort,
      filter_by_time: time,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Employer Details Api */
export const EmployerDetails = async (props) => {
  const formData = new FormData();
  formData.append("company_id", user_type === "company" ? employer_id : props);
  const response = await axios.post(
    `${API_URL}getEmployer`,
    { company_id: user_type === "company" ? employer_id : props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employer / Company Api */
export const AddCompany = async (props) => {
  const response = await axios.put(`${API_URL}company_detail`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Add Employer Contact Api */
export const AddContact = async (props) => {
  const response = await axios.put(`${API_URL}contact_detail`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Add Employer KYC Api */
export const AddKyc = async (props, id) => {
  const response = await axios.put(
    `${API_URL}company_kyc_detail`,
    {
      company_id: id,
      address: props.address,
      city: props.city,
      country: props.country,
      document: props.document,
      fax_number: props.fax_number,
      gstin: props.gstin,
      name: props.name,
      pan_date: props.pan_date,
      pan_no: props.pan_no,
      pincode: props.pincode,
      state: props.state,
      tan_number: props.tan_number,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Employer Api */
export const DeleteEmployer = async (props) => {
  const response = await axios.delete(
    `${API_URL}deleteEmployer/${props}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    },
    props
  );
  return response.data;
};

/*Delete Job Api */
export const DeleteJob = async (props) => {
  const response = await axios.delete(
    `${API_URL}deletejob/${props}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    },
    props
  );
  return response.data;
};

/*Get Interview list api */
export const getInterview = async (
  job_id,
  employee_id,
  search,
  page,
  column,
  limit,
  sort,
  time,
  status,
  cid
) => {
  const response = await axios.post(
    `${API_URL}admin/getInterview`,
    {
      search: search,
      column_name: column,
      sort_order: sort,
      page: page,
      limit: limit,
      job_id: job_id,
      employee_id: employee_id,
      filter_by_time: time,
      filter_by_status: status,
      filter_by_company_id: cid,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data.data;
};

/*Add interview Shedual Api */
export const AddInterviewSchedule = async (props, employee_id, job_id) => {
  // /job_detail(props.state, employee_id, job_id);
  const response = await axios.post(
    `${API_URL}admin/addUpdateInterview`,
    {
      job_id: job_id,
      employee_id: employee_id,
      interview_date: props.interview_date,
      created_by_admin: admin_id,
      interview_status: props.interview_status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Get lmia list Api */
export const GetEmployeeByLima = async (
  id,
  search,
  status,
  page,
  limit,
  col,
  ord,
  time,
  employee_id
) => {
  const response = await axios.post(
    `${API_URL}company/getLmia`,
    {
      lmia_status: status,
      search: search,
      filter_by_job_id: id,
      page: page,
      limit: limit,
      sort_order: ord,
      column_name: col,
      filter_by_time: time,
      filter_employee_id: employee_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add LIMA Api */
export const AddLimia = async (props, employee_id, job_id) => {
  // console.log(props);
  const response = await axios.put(
    `${API_URL}admin/addUpdateLmia`,
    {
      job_id: job_id,
      employee_id: employee_id,
      lmia_status: props.lmia_status,
      apply_id: props.apply_id,
      // completion_time: props.completion_time,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Function get lima substage of empolyee */
export const GetLimaSubStages = async (id) => {
  const response = await axios.post(
    `${API_URL}/getLmiaSubstagesEmployee`,
    {
      lmia_id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Function get lima substage of empolyee */
export const GetJobLimaSubStages = async (id, status) => {
  const response = await axios.post(
    `${API_URL}/getLmiaSubstagesjob`,
    {
      job_id: id,
      lima_status: status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*FUnction to add update lmia sub stage of employee */
export const AddUpdateEmployeeLmiaSubStage = async (props) => {
  const response = await axios.put(
    `${API_URL}addUpdateLmiaSubstagesEmployee`,
    props,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*FUnction to Delete lmia sub stage of employee */
export const deleteLmiaSubstageEmployee = async (id) => {
  const response = await axios.post(
    `${API_URL}/deleteLmiaSubstageEmployee`,
    {
      id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*FUnction to add update lmia sub stage  of job*/
export const AddUpdateJobLmiaSubStage = async (props) => {
  const response = await axios.put(
    `${API_URL}addUpdateLmiaSubstagesJob`,
    props,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*FUction to delete lmiasub stage */
export const deleteLmiaSubstageJob = async (id) => {
  const response = await axios.post(
    `${API_URL}/deleteLmiaSubstageJob`,
    {
      id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Get Interview list api */
export const getFollowupLastData = async (page, column, limit, sort, time) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getAllLastFollowup`,
    {
      column_name: column,
      sort_order: sort,
      page: page,
      limit: limit,
      filter_by_time: time,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
export const getLMIAstatus = async (props) => {
  const response = await axios.post(
    `https://apnaorganicstore.in/canjobs/company/getLmia`,
    { lmia_status: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to get list of the Document */
export const GetEmployerDocumentList = async (id, type) => {
  const response = await axios.post(
    `${API_URL}company/getDocumentsUploaded`,
    {
      company_id: id,
      type: type,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Api to upload document*/
export const UploadEmployerDocument = async (id, type, doc, docId) => {
  const response = await axios.put(
    `${API_URL}company/documentsUpload `,
    {
      company_id: id,
      type: type,
      document_file: doc,
      is_varify: "0",
      id: docId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Api to verify Applicants document */
export const VarifyEmployerDocument = async (id, verify) => {
  const response = await axios.put(
    `${API_URL}company/isVarify `,
    {
      is_varify: verify,
      id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

// ADMIN'S API
/*Get Summary Count Api */
export const getSummaryCount = async () => {
  const response = await axios.get(`${API_URL}admin/getSummaryCounts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data.data;
};

/*Admin login Api */
export const AdminLogin = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  const response = await axios.post(`${API_URL}admin_login`, formData);
  return response.data;
};

/*Admin Reset password Api */
export const AdminResetPasswordApi = async (props) => {
  const response = await axios.put(`${API_URL}admin/resetPassword`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Admin Notification List Api */
export const getAllAdminNotification = async () => {
  const response = await axios.get(`${API_URL}common/getNotifications`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Read Admin Notification Api */
export const ReadNotification = async (props) => {
  const response = await axios.put(
    `${API_URL}common/isReadNotification`,
    { id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Admin List Api */
export const getallAdminData = async (
  type,
  search,
  page,
  limit,
  column,
  sort
) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getAllAdmin`,
    {
      filter_admin_type: type,
      page: page,
      search: search,
      limit: limit,
      column_name: column,
      sort_order: sort,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Admin List Api */
export const getAllFollowUpData = async (
  job,
  company,
  experience,
  search,
  page,
  limit,
  column,
  sort
) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getFollowupView`,
    {
      filter_job_type: job,
      filter_company_name: company,
      filter_experience: experience,
      page: page,
      search: search,
      limit: limit,
      column_name: column,
      sort_order: sort,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );

  return response.data;
};

/*Job Category List Api */
export const getAllJobsCategory = async (
  level,
  type,
  search,
  page,
  limit,
  column_name,
  sort_order
) => {
  const response = await axios.post(
    `${API_URL}admin/getAllJobsCategory`,
    {
      parent_id: level,
      filter_category_type: type,
      search: search,
      page: page,
      limit: limit,
      column_name: column_name,
      sort_order: sort_order,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Job Employee Api */
export const DeleteJobEmployee = async (props) => {
  const response = await axios.delete(
    `${API_URL}deleteEmployee/${props}`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    },
    props
  );
  return response.data;
};

/*Add Job Category Api */
export const AddJobCategory = async (props) => {
  const response = await axios.put(
    `${API_URL}${user_type}/addCategory`,
    props,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Job Category Api */
export const DeleteJobCategory = async (props) => {
  const response = await axios.delete(
    `${API_URL}deletejobCategory/${props}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    },
    props
  );
  return response.data;
};

/* Admin Detail Api */
export const AdminDetails = async (props) => {
  const formData = new FormData();
  formData.append("admin_id", props);
  const response = await axios.post(
    `${API_URL}/${user_type}/getAdmin`,
    { admin_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Admin Api */
export const AddAdmin = async (props) => {
  const response = await axios.put(`${API_URL}${user_type}/addAdmin`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Get Filter Api */
export const GetFilter = async (props) => {
  const response = await axios.post(`${API_URL}admin/getFilterList`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response;
};

/*Add Filters Api */
export const AddFIlter = async (props, id) => {
  const response = await axios.put(
    `${API_URL}${user_type}/addUpdatefilterList`,
    { id: id, json_item: props.json_item },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Filter Api */
export const DeleteFilter = async (pId, cId) => {
  const response = await axios.post(
    `${API_URL}${user_type}/deleteFilterListItem`,
    { id: pId, json_item_id: cId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Admin Api */
export const DeleteAdmin = async (props) => {
  const response = await axios.post(
    `${API_URL}${user_type}/deleteAdmin`,
    { admin_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Aplicant's Followup Api */
export const AddFollowup = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/addFollowUpEmployee`,
    {
      admin_id: admin_id,
      // job_id: props.jobId,
      employee_id: props.employee_id,
      remark: props.remark,
      next_date: props.next_followup_date,
      subject: props.subject,
      status: props.status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*get Followup single data Api */
export const getSingleFollowup = async (
  employee_id,
  column_name,
  sort_order,
  page,
  limit,
  status,
  search /*, job_id*/
) => {
  const response = await axios.post(
    `${API_URL}admin/getFollowUpEmployee`,
    {
      /*job_id: job_id,*/ employee_id: employee_id,
      column_name: column_name,
      sort_order: sort_order,
      page: page,
      status: status,
      limit: limit,
      search: search,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );

  return response.data;
};
/*get Followup single data Api */
export const getSingleCompanyFollowup = async (
  company_id,
  column_name,
  sort_order,
  page,
  limit,
  status,
  search
) => {
  const response = await axios.post(
    `${API_URL}admin/getFollowUpEmployer`,
    {
      company_id: company_id,
      column_name: column_name,
      sort_order: sort_order,
      page: page,
      status: status,
      limit: limit,
      search: search,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );

  return response.data;
};

/*Add Comapany's Followup Api */
export const AddCompanyFollowup = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/addFollowUpEmployer`,

    // // "admin_id":"2",
    // // "job_id":"1",
    // company_id: props.company_id,
    // remark: props.remark,
    // next_date: props.next_date,
    // subject: props.subject,
    props,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Get Admin token to view ass other admin */
export const GetAdminToken = async (props) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getToken`,
    {
      admin_id: props,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get email template */
export const GetAllEmailTemplate = async (props) => {
  const response = await axios.post(`${API_URL}/common/getEmailTemplate`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to update email template */
export const AddUpdateEmailTemplate = async (props) => {
  const response = await axios.put(
    `${API_URL}/common/addUpdateEmailTemplate`,
    {
      id: props.id,
      email_type: props.email_type,
      subject: props.subject,
      message: props.message,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to Test email template */
export const TestEmail = async (props) => {
  // console.log(props);
  const response = await axios.post(
    `${API_URL}/common/emailTemplateTest`,
    {
      email_id: props.email_id,
      email_template_id: props.email_template_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get single  email preveiw */
export const GetPreviewEmail = async (id) => {
  const response = await axios.post(
    `http://192.168.29.92/canjobs_latest/common/openEmail`,
    {
      email_id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to read email */

export const ReadEmail = async (page, limit, search, email) => {
  const response = await axios.post(
    `http://192.168.29.92/canjobs_latest/common/readEmail`,
    {
      // email_id: id,
      page: page,
      limit: limit,
      filter_by_email_id: email,
      search: search,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get the job filterd by employee id if it is applied or not */
export const GetEmployeeFilterJob = async (
  id /* skill*/,
  search,
  location,
  category,
  skill,
  job,
  page,
  limit,
  column_name,
  sort_order,
  company
) => {
  // console.log(search,
  // location,
  // category,
  // skill,
  // job,
  // page,
  // limit,
  // column_name,
  // sort_order,
  // company)
  const response = await axios.post(
    `${API_URL}admin/getAllJobsViewAdmin`,
    {
      employee_id: id,
      filter_keyskill: skill,
      filter_category_id: category,
      filter_job_swap: job,
      filter_location: location,
      page: page,
      search: search ? search : company,
      limit: limit,
      column_name: column_name,
      sort_order: sort_order,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Api to Reserved employee for a job */
export const ReservedEmployeeForJob = async (id, employee_id, status) => {
  const response = await axios.put(
    `${API_URL}setEmployeeReserve`,
    {
      apply_id: id,
      is_reserve: status,
      employee_id: employee_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to Remove Reserved employee for a job */
export const RemoveReservedEmployeeForJob = async (apply_id, employee_id) => {
  const response = await axios.post(
    `${API_URL}removeEmployeeReserve`,
    {
      apply_id: apply_id,
      employee_id: employee_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to Send email to the user and company*/
export const SendEmail = async (data) => {
  // console.log(data);
  const response = await axios.post(
    `${API_URL}sendEmailTest`,
    {
      to: data.email,
      subject: data.subject,
      body: data.description,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to get manager's team list*/
export const GetManagerTeam = async (manager_id) => {
  const response = await axios.post(
    `${API_URL}manager/getTeam`,
    {
      manager_id: manager_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to Add executive to the manager*/
export const AddExecutiveTeam = async (manager_id, executive_id) => {
  const response = await axios.put(
    `${API_URL}manager/addUpadateTeam`,
    {
      manager_id: manager_id,
      executive_id: executive_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to Remove executive to the manager*/
export const RemoveExecutiveTeam = async (executive_id) => {
  const response = await axios.put(
    `${API_URL}manager/deleteTeamMember`,
    {
      executive_id: executive_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to Reasign job to manager*/
export const ReassignJobTOManager = async (manager_id, job_id) => {
  const response = await axios.put(
    `${API_URL}admin/assignJobToManager`,
    {
      manager_id: manager_id,
      job_id: job_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to get employee setting */
export const GetEmployeeSetting = async () => {
  const response = await axios.post(
    `${API_URL}employee/getEmployeeSetting`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to get employer setting */
export const GetEmployerSetting = async () => {
  const response = await axios.post(
    `${API_URL}employer/getEmployerSetting`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to get Admin setting */
export const GetAdminrSetting = async () => {
  const response = await axios.post(`${API_URL}admin/getAdminSetting`, "", {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};
/*Api to get Parent setting */
export const GetParentSetting = async (data) => {
  const response = await axios.post(
    `${API_URL}setting/getParentSetting`,
    { type: data },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to Add permission to employeE*/
export const AddEmployeePermission = async (data) => {
  const response = await axios.put(
    `${API_URL}employee/updateEmployeeSetting`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to Add permission to employer*/
export const AddEmployerPermission = async (data) => {
  const response = await axios.put(
    `${API_URL}employer/updateEmployerSetting`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to Add permission to admin*/
export const AddAdminPermission = async (data) => {
  const response = await axios.put(`${API_URL}admin/updateAdminSetting`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};
/*Api to Add permission by admin to employee and employer*/
export const AddChildPermission = async (data) => {
  const response = await axios.put(
    `${API_URL}setting/updateParentSetting`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
//Agent
/*Api to login agent*/
export const LoginAgent = async (state) => {
  const formData = new FormData();
  formData.append("email", state.email);
  formData.append("password", state.password);
  const response = await axios.post(`${API_URL}agent/login`, formData);
  return response.data;
};

export const SignupAgent = async (state) => {
  const formData = new FormData();
  formData.append("email", state.email);
  formData.append("password", state.password);
  formData.append("name", state.name);
  formData.append("otp", state.otp);
  const response = await axios.post(`${API_URL}agent/signup`, formData);
  return response.data;
};

/*Api to Add update agent*/
export const AddUpdateAgent = async (data) => {
  const response = await axios.put(`${API_URL}agent/addUpadateAgent`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to Get agent*/
export const GetAgent = async (id, search, page, limit, column, Order) => {
  const response = await axios.post(
    `${API_URL}agent/getAgent`,
    {
      page: page,
      search: search,
      limit: limit,
      column_name: column,
      sort_order: Order,
      id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to delete agent */
export const DeleteAgent = async (id) => {
  const response = await axios.post(
    `${API_URL}agent/deleteAgent`,
    {
      id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get agent json list */
export const GetAgentJson = async () => {
  const response = await axios.post(`${API_URL}filterList/agentList.json    `, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Payment Api's */
export const CreateRazorpay = async (price, currency) => {
  const response = await axios.post(
    `${API_URL}payment/creatRazorpayOrder`,
    {
      price: price,
      currency: currency,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};
export const AddRazorpay = async (amount, response) => {
  await axios.post(
    `${API_URL}payment/addRazorPayReciept`,
    {
      amount: amount,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpay0rderId: response.razorpay_order_id,
      razorpaysighature: response.razorpay_signature,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};
/*Api to get payment list */
export const GetPaymentList = async (id, user) => {
  const response = await axios.post(
    `${API_URL}payment/getPaymentReciept`,
    {
      user_id: id,
      user_role: user,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to add cash paymet by admin  */

export const AddCashpayment = async (data) => {
  const response = await axios.put(
    `${API_URL}payment/addPaymentReciept`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
