import styles from "./Forms.module.css";

function Forms({ formData, setFormData, onNext, prefix = "" }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldName = prefix ? `${name}${prefix}` : name;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const fields = [
    { label: "Nome completo", name: "nome", type: "text" },
    { label: "CPF", name: "cpf", type: "text" },
    { label: "Telefone", name: "telefone", type: "text" },
    { label: "E-mail", name: "email", type: "email" },
    { label: "CEP", name: "cep", type: "text" },
    { label: "Estado", name: "estado", type: "text" },
    { label: "Cidade", name: "cidade", type: "text" },
    { label: "Bairro", name: "bairro", type: "text" },
    { label: "Rua", name: "rua", type: "text" },
    { label: "Número", name: "numero", type: "text" },
    { label: "Complemento", name: "complemento", type: "text", placeholder: "Opcional" },
  ];

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.formGrid}>
          {fields.map((field) => {
            const fullFieldName = prefix ? `${field.name}${prefix}` : field.name;
            return (
              <div className={styles.formGroup} key={fullFieldName}>
                <label className={styles.label}>{field.label}</label>
                <input
                  className={styles.input}
                  type={field.type}
                  name={field.name}
                  value={formData[fullFieldName] || ""}
                  onChange={handleChange}
                  required={field.name !== "complemento"}
                  placeholder={field.placeholder || ""}
                />
              </div>
            );
          })}
        </div>

        <button type="submit" className={styles.button}>Avançar</button>
      </form>
    </div>
  );
}

export default Forms;
