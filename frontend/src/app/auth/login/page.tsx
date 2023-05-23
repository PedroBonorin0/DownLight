import { Form } from "../../components/Form";

export default async function Home() {
  return (
    <div className="px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-48 w-auto rounded-full"
          src="/company.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Faça login em sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xs">
        <Form />
        <div className="mt-10 text-sm">
          <a
            href="#"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Esqueceu a senha ?
          </a>
        </div>
      </div>
    </div>
  );
}
