"use client";

import { Controller, useFormContext } from "react-hook-form";

import * as S from "./Step1.styled";

import RHFTextField from "@/shared/components/form/rhf-text-field";

import { type InferredBookReviewSchema } from "../../schema/review-schema";

import { RHFDateTimePicker } from "@/shared/components/form/rhf-date-picker";
import { RHFSelect } from "@/shared/components/form/rhf-select";
import { typedEntries } from "@/shared/utils/type";
import { MenuItem, Stack, Typography } from "@mui/material";
import { READ_STATUS } from "../../config/read-status";

const BookStep1 = () => {
  const { control, getValues, setValue } =
    useFormContext<InferredBookReviewSchema>();

  /** 독서 상태에 따라 독서 기간을 초기화합니다. */
  const handleInitDateOnStatusChange = (status: string) => {
    console.log("handleInitDateOnStatusChange", status);
    if (status === READ_STATUS.TODO.value) {
      setValue("startDate", undefined);
      setValue("endDate", undefined);
      return;
    }

    if (status === READ_STATUS.DONE.value) {
      const endDate = getValues("endDate");
      if (endDate) {
        setValue("endDate", undefined);
      }
    }
  };

  return (
    <S.Wrapper>
      <S.FormGroup>
        <S.Label>독서 상태</S.Label>
        <RHFSelect
          name="status"
          onChange={(e) => handleInitDateOnStatusChange(e.target.value)}
          fullWidth
        >
          {typedEntries(READ_STATUS).map(([key, { value, label }]) => (
            <MenuItem key={key} value={value}>
              {label}
            </MenuItem>
          ))}
        </RHFSelect>
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>도서 제목</S.Label>
        <RHFTextField name="title" />
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>저자</S.Label>
        <RHFTextField name="author" />
      </S.FormGroup>

      <Stack direction="row" spacing={2}>
        <RHFDateTimePicker name="publishDate" label="도서 출판일" />
      </Stack>

      <Controller
        name="status"
        control={control}
        render={({ field }) => {
          // 상태가 TODO인 경우 날짜 선택을 숨김
          if (field.value === "TODO") return <></>;
          return (
            <Stack gap={2}>
              <Typography variant="caption" sx={{ display: "flex", gap: 1 }}>
                {"독서 기간을 선택해주세요."}
              </Typography>

              <Stack direction="row" spacing={2}>
                <RHFDateTimePicker name="startDate" label="독서 시작일" />
                <RHFDateTimePicker name="endDate" label="독서 종료일" />
              </Stack>
            </Stack>
          );
        }}
      />
    </S.Wrapper>
  );
};

export default BookStep1;
