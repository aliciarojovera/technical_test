function NotAuthorized() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-10 px-[10%] py-12">
      <p className="mobile:text-center text-lg font-semibold text-gray-600">
        Se te ha redirigido aquí porque no estás autorizado a ver la página a la
        que intentabas acceder.
      </p>
    </section>
  );
}

export { NotAuthorized };
