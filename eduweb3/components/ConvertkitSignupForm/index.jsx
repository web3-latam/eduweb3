import { FormEventHandler, useCallback, useState } from 'react';
import styles from './ConvertkitSignupForm.module.css';

const ConvertkitSignupForm = ({ formId, children }) => {
  const name = 'email';
  const [success, setSuccess] = useState();

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const target = event.target;
      const data = new FormData(target);
      const email = data.get(name);

      const body = JSON.stringify({
        formId,
        email
      });

      const headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      });

      try {
        await fetch(`/api/convertkit/subscribe`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers,
          body
        });

        setSuccess(true);
      } catch {
        setSuccess(false);
      }
    },
    [formId]
  );

  if (success === false) {
    return <p>Oh no, algo salió mal.</p>;
  }

  if (success) {
    return <p>Estás dentro. Gracias.</p>;
  }

  return (
    <div>
      <form
        target="_blank"
        className={`flex flex-col items-center justify-center`}
        onSubmit={onSubmit}
      >
        <input
          type="email"
          className="w-full placeholder:pl-4 rounded-xl border-r-transparent py-1 text-sm hover:border-r-transparent md:w-80 md:text-base text-gray-900"
          name={name}
          aria-label="Tu dirección de correo electrónico"
          placeholder="tu@email.com"
          required
        />

        <button className="min-w-[6rem] bg-slate-500 shadow-lg px-8 py-2 rounded-3xl my-8 hover:bg-slate-200 hover:text-gray-900">
          {children ?? 'Registrarme'}
        </button>
      </form>

      <p className={'mt-2 text-center text-sm md:text-xs'}>
        Suscribete a nuestro boletīn para recibir noticias.
      </p>
    </div>
  );
};

export default ConvertkitSignupForm;
