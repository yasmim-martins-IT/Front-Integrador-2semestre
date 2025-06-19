// Importa o hook useState do React
import { useState } from 'react';
// Importa o CSS module para estilização
import styles from './cadastro.module.css';
// Importa a função que faz a chamada à API para cadastrar o sensor
import { criarSensor } from '../services/API';

export function CadastroSensor() {
  // Estado que armazena os campos do formulário
  const [form, setForm] = useState({
    sensor: '',
    tipo: 'temperatura',
    mac_address: '',
    unidade_med: '',
    latitude: '',
    longitude: '',
    status: true // status inicial como verdadeiro
  });

  // Estado que armazena mensagens para o usuário (ex.: erro ou sucesso)
  const [mensagem, setMensagem] = useState('');

  /**
   * handleChange:
   * Atualiza o estado do formulário sempre que o usuário altera algum input.
   * Também trata campos tipo checkbox (true/false) e os campos numéricos.
   */
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      // Se for checkbox, usa checked; caso contrário, usa value
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  /**
   * handleSubmit:
   * Chama a API quando o formulário for enviado.
   * Exibe mensagens adequadas e limpa o formulário se o cadastro for bem-sucedido.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem(''); // limpa a mensagem anterior

    try {
      // Faz a chamada à API para cadastrar o sensor
      await criarSensor(form);
      setMensagem('Sensor cadastrado com sucesso!');
      // Redefine o formulário para os valores iniciais
      setForm({
        sensor: '',
        tipo: 'temperatura',
        mac_address: '',
        unidade_med: '',
        latitude: '',
        longitude: '',
        status: true,
      });
    } catch (error) {
      setMensagem('Erro ao cadastrar sensor');
      console.error(error); // imprime o erro no console para debug
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Sensor</h1>

      {/* Formulário que dispara handleSubmit no evento onSubmit */}
      <form onSubmit={handleSubmit} className={styles.form}>

        <label>
          Nome do Sensor:
          <input
            placeholder='Digite o nome do sensor'
            type="text"
            name="sensor"
            value={form.sensor}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tipo:
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
          >
            <option value="temperatura">Temperatura</option>
            <option value="umidade">Umidade</option>
            <option value="luminosidade">Luminosidade</option>
            <option value="contador">Contador</option>
          </select>
        </label>

        <label>
          MAC Address:
          <input
            placeholder='Digite o Mac Address'
            type="text"
            name="mac_address"
            value={form.mac_address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Unidade de Medida:
          <input
            placeholder='Digite qual a unidade de medida'
            type="text"
            name="unidade_med"
            value={form.unidade_med}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Latitude:
          <input
            placeholder='Digite a latitude'
            type="text"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Longitude:
          <input
            placeholder='Digite a longitude'
            type="number"
            step="any"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Ativo:
          {/* Select que altera o status entre true e false */}
          <select
            name="status"
            value={String(form.status)}
            onChange={handleChange}
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </label>

        <div className={styles.botaoContainer}>
          <button type="submit" className={styles.button}>Cadastrar</button>
          {/* Exibe a mensagem de status da operação */}
          {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
        </div>
      </form>
    </div>
  );
}
