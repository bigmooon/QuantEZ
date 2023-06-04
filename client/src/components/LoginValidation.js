function Validation(values) {
  alert("")
  let error = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // 공백허용 안함
  const password_pattern = /^(?=.*\d)(?=.*[a-zA-Z]){4,}$/

  if(values.email === "") {
    error.email = "이메일을 입력해주세요."
  }
  else if(!email_pattern.test(values.email)){
    error.email = "이메일이 일치하지 않습니다."
  }else {
    error.email = ""
  }

  if(values.password === "") {
    error.password = "비밀번호를 입력해주세요."
  }
  else if (!password_pattern.test(values.password)) {
    error.password = "비밀번호가 일치하지 않습니다."
  } else {
    error.password = ""
  }
  return error;
}

export default Validation;
