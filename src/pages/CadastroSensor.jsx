import { useState } from 'react';
import styles from './cadastro.module.css';
import { criarSensor } from '../services/API';

export function CadastroSensor() {
     const [status, setStatus] = useState(true); // valor inicial true ou false
    
  function handleChange(e) {
    // Como o value do select é string, converte para boolean
    setStatus(e.target.value === 'true');
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui você envia o status (boolean) junto com os outros dados do sensor
    console.log('Status selecionado:', status);
  }
  const [form, setForm] = useState({
    sensor: '',
    tipo: 'temperatura',
    mac_address: '',
    unidade_med: '',
    latitude: '',
    longitude: '',
    status: true
  });

  const [mensagem, setMensagem] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');

    try {
      await criarSensor(form);
      setMensagem('Sensor cadastrado com sucesso!');
      setForm({
        sensor: '',
        tipo: 'temperatura',
        mac_address: '',
        unidade_med: '',
        latitude: '',
        longitude: '',
        status: true
      });
    } catch (error) {
      setMensagem('Erro ao cadastrar sensor');
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Sensor</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome do Sensor:
          <input placeholder='Digite o nome do sensor' type="text" name="sensor" value={form.sensor} onChange={handleChange} required />
        </label>

        <label>
          Tipo:
          <select placeholder = 'Escolha uma opção' name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="temperatura">Temperatura</option>
            <option value="umidade">Umidade</option>
            <option value="luminosidade">Luminosidade</option>
            <option value="contador">Contador</option>
          </select>
        </label>

        <label>
          MAC Address:
          <input placeholder='Digite o Mac Address' type="text" name="mac_address" value={form.mac_address} onChange={handleChange} required />
        </label>

        <label>
          Unidade de Medida:
          <input placeholder='Digite qual a unidade de medida' type="text" name="unidade_med" value={form.unidade_med} onChange={handleChange} required />
        </label>

        <label>
          Latitude:
          <input placeholder='Digite a latitude' type="text" name="latitude" value={form.latitude} onChange={handleChange} required />
        </label>

        <label>
          Longitude:
          <input placeholder='Digite a longitude' type="number" step="any" name="longitude" value={form.longitude} onChange={handleChange} required />
        </label>

        <label>
          Ativo:
          <select placeholder='Escolha uma opção'  name="status" checked={form.status} onChange={handleChange} >
           <option value="true">Ativo</option>
          <option value="false">Inativo</option>
            </select>
        </label>

        <button type="submit" className={styles.button}>Cadastrar</button>
        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
      </form>
    </div>
  );
}
