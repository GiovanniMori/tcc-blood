import React from "react"
import { IoIosStats } from "react-icons/io"
import { MdCardGiftcard } from "react-icons/md"
import { TbHeartHandshake } from "react-icons/tb"

const ICON_SIZE = 36
function Goal() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Nossa meta
      </h1>
      <div className="flex gap-24 items-center">
        {/* <Tilt>
        <div className="flex flex-col w-[300px] h-[200px] bg-gradient-to-br from-red-400 to-red-500 rounded-lg p-4 text-white sticky">
          <GiDrop size={36} className="self-end" />
          <div>
            <h1 className="mt-16 font-semibold">Giovanni Vichiatti Mori</h1>
            <h1 className="ml-4 text-gray-600 font-light">O_NEGATIVO</h1>
          </div>
        </div>
      </Tilt> */}
        <div className="flex flex-col gap-16">
          <GoalCard
            icon={<IoIosStats />}
            title="Aumentar a taxa de doação"
            description="  Nosso site tem como objetivo aumentar a doação de sangue através
              da notificação dos doadores quando houver pedidos de doação de
              sangue em sua área. Essa funcionalidade do site irá facilitar a
              doação de sangue, fornecendo informações sobre os tipos sanguíneos
              mais necessários na região e quais hospitais e clínicas aceitam
              doações de sangue."
          />
          <GoalCard
            icon={<TbHeartHandshake />}
            title="Melhorar a experiência do doador"
            description="Facilitar a doação de sangue por meio do uso de tecnologia, como
            aplicativos móveis que ajudam os doadores a agendar suas doações
            e receber lembretes quando for hora de doar novamente."
          />
          <GoalCard
            icon={<MdCardGiftcard />}
            title="Recompensas"
            description="Oferecer incentivos para os doadores de sangue, como descontos
            em estabelecimentos locais ou pontos que podem ser trocados por
            recompensas, para encorajá-los a doar sangue regularmente."
          />
        </div>
      </div>
    </div>
  )
}

export default Goal

function GoalCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="p-2 bg-foreground rounded-md text-secondary w-fit">
        {icon}
      </div>
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  )
}
