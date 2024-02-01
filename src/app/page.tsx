import Image from 'next/image';

export default function Home() {


  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      <div className="flex shadow-md">
        <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: '24rem', height: '32rem' }}>
          <div className="w-72">
            <Image alt='logo' width={200} height={200} src='/images/logo.png' style={{ width: 130, margin: '0 auto' }} />
            <small className="text-gray-400">Bem vindo! Por favor, informe os dados abaixo:</small>


            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold mr-2">Não possui conta?</span>
              <a href="#" className="text-xs font-semibold text-purple-700">Fale com nossa equipe</a>
            </div>
          </div>
        </div>


        <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: '24rem', height: '32rem' }}>
          <Image alt='intro' width={400} height={400} className="w-full h-full bg-purple-700 bg-center bg-no-repeat bg-cover rounded-r-md py-8" src="/images/phone-intro.png" />
        </div>

      </div >


      <div className="mt-3 w-full">
        <p className="text-center text-purple-700">Desenvolvido por 2Clics.</p>
      </div>
    </div>
  );
}
