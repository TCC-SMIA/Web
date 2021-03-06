import React, {
  useState,
  useCallback,
  useEffect,
  FormEvent,
  ChangeEvent,
} from 'react';

import Switch from 'react-switch';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useNavigate } from 'react-router';
import { IoIosArrowDown } from 'react-icons/io';

import { toast } from 'react-toastify';
import Dropzone from '../../components/Dropzone';
import { Container, Header, Option, OptionMap, SearchSelect } from './styles';
import api from '../../services/api';
import Button from '../../components/Button';

const Report: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [complaintTypes, setComplaintTypes] = useState<string[]>();
  const [selectedType, setselectedType] = useState('');

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/complaints/types').then((response) => {
      setComplaintTypes(response.data.complaint_types);
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  const handleMapClick = useCallback((event: LeafletMouseEvent): void => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      setLoading(true);

      if (title === '') {
        setLoading(false);
        throw new Error('Titulo não pode estar vazio.');
      }

      if (description === '') {
        setLoading(false);
        throw new Error('Descrição não pode estar vazia.');
      }

      const [latitude, longitude] = selectedPosition;

      const data = new FormData();

      data.append('title', title);
      data.append('description', description);
      data.append('date', String(new Date()));
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('anonymous', anonymous ? '1' : '0');
      data.append('type', selectedType);

      if (selectedFile) {
        data.append('image', selectedFile);
      }

      await api.post('complaints', data);

      toast.success('Relato criado com sucesso');

      setLoading(false);
      toast.success('Relato criado com sucesso.');
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      if (err.message) {
        toast.error(err.message);
        return;
      }
      toast.error('Houve um erro ao tentar criar este relato.');
    }
  }

  const handleChangeTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleChangeDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const handleAnonymousSwitch = useCallback(() => {
    setAnonymous(!anonymous);
  }, [anonymous]);

  const handleSelectType = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setselectedType(event.target.value);
    },
    [],
  );

  return (
    <Container>
      <Header>
        <h1>Relatar</h1>
      </Header>
      <hr color="#d3d3d3" />
      <form>
        <Option>
          <p>Título do relato</p>
          <input
            onChange={(event) => handleChangeTitle(event)}
            placeholder=""
            name="titulo do relato"
          />
        </Option>

        {!!complaintTypes && (
          <Option>
            <p>Tipo do relato</p>
            <SearchSelect>
              <select
                name="uf"
                id="uf"
                onChange={handleSelectType}
                value={selectedType}
              >
                <option value="0">Selecione um tipo</option>
                {complaintTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <IoIosArrowDown />
            </SearchSelect>
          </Option>
        )}

        <Dropzone onFileUploaded={setSelectedFile} />

        <Option>
          <p>Deseja publicar como anônimo</p>
          <Switch
            onChange={() => handleAnonymousSwitch()}
            onColor="#426d49"
            offColor="#777"
            checked={anonymous}
          />
        </Option>

        <Option>
          <p>Localização</p>
        </Option>

        <OptionMap>
          <Map
            doubleClickZoom
            center={initialPosition}
            zoom={15}
            onClick={handleMapClick}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
        </OptionMap>

        <Option>
          <p>Descrição do relato</p>
        </Option>
        <textarea onChange={(event) => handleChangeDescription(event)} />

        <hr color="#d3d3d3" />
        <footer>
          <Button loading={loading} type="submit" onClick={handleSubmit}>
            Publicar
          </Button>
        </footer>
      </form>
    </Container>
  );
};

export default Report;
