import Image from "next/image";
import React from "react";

export default function MakeFriends() {
  return (
    <div className="flex items-center flex-col gap-2 text-center w-[350px]">
      <Image src={"friends.svg"} height={300} width={350} alt="Amigos" />
      <p className="text-lg text-gray-700 leading-relaxed">
        Doar sangue com amigos ao seu lado torna o ato ainda mais especial e
        valioso. Doar com amigos não apenas salva vidas, mas também fortalece os
        laços de amizade de maneira única e especial.
      </p>
    </div>
  );
}
