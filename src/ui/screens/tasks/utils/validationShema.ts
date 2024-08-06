import * as Yup from "yup";

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required("El título es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  dateTime: Yup.date()
    .required("La fecha y hora son requeridas")
    .test(
      "is-future",
      "La fecha y hora deben ser al menos 5 minutos después de la hora actual",
      function (value) {
        const currentDate = new Date();
        const fiveMinutesFromNow = new Date(
          currentDate.getTime() + 5 * 60 * 1000
        );
        return value && value >= fiveMinutesFromNow;
      }
    ),
});
