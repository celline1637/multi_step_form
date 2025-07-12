import { typedKeys } from "@/shared/utils/type";
import * as yup from "yup";
import { READ_STATUS } from "../config/read-status";

const transformDate = (value: any) =>
  value === "" || isNaN(new Date(value).getTime()) ? null : new Date(value);

export const bookReviewSchema = yup.object({
  title: yup.string().required("도서 제목을 입력해주세요."),
  status: yup
    .string()
    .oneOf(typedKeys(READ_STATUS))
    .required("독서 상태를 선택해주세요."),

  publishDate: yup.date().transform(transformDate).nullable().notRequired(),

  startDate: yup
    .date()
    .transform(transformDate)
    .nullable()
    .min(yup.ref("publishDate"), "출판일 이후로 시작일을 설정해주세요.")
    .when("status", {
      is: (val: keyof typeof READ_STATUS) =>
        val === READ_STATUS.PROGRESS.value ||
        val === READ_STATUS.DONE.value ||
        val === READ_STATUS.HOLD.value,
      then: (schema) => schema.required("독서 시작일을 입력해주세요."),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  endDate: yup
    .date()
    .transform(transformDate)
    .nullable()
    .when("status", {
      is: READ_STATUS.DONE.value,
      then: (schema) =>
        schema
          .required("독서 종료일을 입력해주세요.")
          .min(yup.ref("startDate"), "종료일은 시작일 이후여야 합니다."),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  totalPageCount: yup
    .number()
    .min(1)
    .required("전체 페이지 수를 입력해주세요."), // 내부적으로만 사용

  rating: yup.number().min(0).max(5).required("별점을 입력해주세요."),

  review: yup.string().when("rating", {
    is: (val: number) => val === 1 || val === 5,
    then: (schema) =>
      schema
        .required("별점 1점 또는 5점에는 후기를 입력해야 합니다.")
        .min(100, "최소 100자 이상 작성해주세요."),
    otherwise: (schema) => schema.notRequired(),
  }),

  quotes: yup
    .array()
    .of(
      yup.object({
        text: yup.string().required("인용구 내용을 입력해주세요."),
        page: yup
          .number()
          .min(1)
          .required("페이지 번호를 입력해주세요.")
          .test(
            "max-page",
            "전체 페이지 수를 넘을 수 없습니다.",
            function (value) {
              const { totalPageCount } = this.options.context || {};
              return !totalPageCount || (value ?? 0) <= totalPageCount;
            }
          ),
      })
    )
    .required(),

  isPublic: yup.boolean().required(),
});

export type InferredBookReviewSchema = yup.InferType<typeof bookReviewSchema>;
