import styled from "@emotion/styled";
import Link from "next/link";

export const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;

export const CreateButton = styled.button`
  background: black;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
`;

export const CardGrid = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

export const CardLink = styled(Link)`
  background: #f9f9f5;
  border-radius: 16px;
  width: 220px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const Emoji = styled.div`
  font-size: 32px;
`;

export const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 8px 0;
`;

export const CardMeta = styled.div`
  font-size: 13px;
  color: #666;
`;
