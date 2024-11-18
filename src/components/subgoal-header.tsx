import React from 'react';
import Link from 'next/link';

type HeaderProps = {
  title: string,
}
export default function Header({ title }: HeaderProps) {

  return (
    <div className="header flex items-center mb-6">
      <Link href="/">
        <button className="mr-4">
          <span className="text-xl">&#8592;</span> {/* 뒤로가기 화살표 아이콘 */}
        </button>
      </Link>
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}