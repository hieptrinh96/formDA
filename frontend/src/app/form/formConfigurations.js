export const formConfigurations = {
  formDa: {
    title: "DA Form",
    fields: [
      { label: "First Name", name: "first fame", type: "text", required: true },
      { label: "Last Name", name: "last name", type: "text", required: true },
      { label: "Email", name: "email", type: "email", required: true }
    ]
  },
  registration: {
    title: "Registration Form",
    fields: [
      { label: "Username", name: "username", type: "text", required: true },
      { label: "Password", name: "password", type: "password", required: true }
    ]
  }
}