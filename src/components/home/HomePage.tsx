"use client";

import BookLayout from "@/shared/layout/layout";
import { useRouter } from "@/shared/routes/hooks";
import * as S from "./HomePage.styled";

type BookSummary = {
  id: number;
  emoji: string;
  title: string;
  createdAt: string;
};

const mockBooks: BookSummary[] = [
  {
    id: 1,
    emoji: "📘",
    title: "리액트 완벽 가이드",
    createdAt: "2025. 7. 10.",
  },
  {
    id: 2,
    emoji: "🌟",
    title: "AI로 바뀌는 세상",
    createdAt: "2025. 6. 30.",
  },
  {
    id: 3,
    emoji: "📝",
    title: "프론트엔드 개발자의 회고록",
    createdAt: "2025. 6. 18.",
  },
];

export default function HomeView() {
  const router = useRouter();

  const handleCreateNew = () => {
    router.push("/review/new");
  };

  return (
    <BookLayout>
      <BookLayout.Header
        title="독서기록장을 남겨보아요"
        desc="좋았던 책, 남기고 싶은 문장들을 모아보세요."
      >
        <S.CreateButton onClick={handleCreateNew}>+ 새로 만들기</S.CreateButton>
      </BookLayout.Header>

      <S.CardGrid>
        {mockBooks.map((book) => (
          <S.CardLink key={book.id} href={`/review/${book.id}`}>
            <S.Emoji>{book.emoji}</S.Emoji>
            <S.CardTitle>{book.title}</S.CardTitle>
            <S.CardMeta>{book.createdAt}</S.CardMeta>
          </S.CardLink>
        ))}
      </S.CardGrid>
    </BookLayout>
  );
}
