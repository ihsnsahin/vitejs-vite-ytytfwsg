import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
} from 'reactstrap';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};
const errorMessages = {
  email: 'Please enter a valid email address',
  password:
    'Password must be  at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character',
};
const userList = [
  {
    email: 'ihsansahin777@gmail.com',
    password: 'Sifre123!',
  },
];

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function isStrongPassword(password) {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    return regex.test(password);
  }
  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });
    console.log(name, value);
    if (name === 'email') {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === 'password') {
      if (isStrongPassword(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === 'terms') {
      if (value) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    const user = userList.find(
      (item) => item.password === form.password && item.email === form.email
    );
    if (user) {
      setForm(initialForm);
      history.push('/success');
    }
  };
  useEffect(() => {
    if (
      validateEmail(form.email) &&
      form.terms &&
      isStrongPassword(form.password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  return (
    <Card>
      <CardHeader>Giriş Yap</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              id="Email"
              name="email"
              placeholder="Enter your email"
              type="email"
              onChange={handleChange}
              value={form.email}
              invalid={errors.email}
              data-cy="input-email"
            />
            {errors.email && <FormFeedback>{errorMessages.emai}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Enter your password "
              type="password"
              onChange={handleChange}
              value={form.password}
              invalid={errors.password}
              data-cy="input-password"
            />
            {errors.password && (
              <FormFeedback>{errorMessages.password}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup check>
            <Input
              id="terms"
              name="terms"
              type="checkbox"
              onChange={handleChange}
              checked={form.terms}
              data-cy="input-terms"
            />{' '}
            <Label htmlFor="terms" check>
              I agree to terms of service and privacy policy
            </Label>
          </FormGroup>
          <FormGroup>
            <Button data-cy="submit" disabled={!isValid}>Sign In</Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
}
