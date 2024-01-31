import type { FormikValues } from 'formik'
import { useFormik } from 'formik'
import type * as yup from 'yup'

class FORMIK {
  static useFormFormik = <T extends FormikValues = FormikValues>(
    scheme: yup.ObjectSchema<object, T, object, ''>,
    initialValues: T,
    onSubmit: (values: T) => void
  ) =>
    useFormik({
      validationSchema: scheme,
      enableReinitialize: true,
      validateOnMount: true,
      initialValues: initialValues,
      onSubmit: (values: T) => onSubmit(values)
    })
}

export default FORMIK
