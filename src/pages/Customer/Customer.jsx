import React, { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,

  PieChartOutlined,
  FundViewOutlined,
  AimOutlined,
  ShopOutlined,
  FileTextOutlined,
  ControlOutlined,
  DownOutlined,
  LogoutOutlined,
  FormOutlined
} from '@ant-design/icons';
import { Button } from '../../components';

// Assets
import logo from '../../assets/logo.png';
import uk from '../../assets/icons/uk.png';

import './Customer.css';

function Customer({ name }) {
  const [modalFormStatus, setModalFormStatus] = useState(false);
  const [modalDeleteStatus, setModalDeleteStatus] = useState(false);
  const [fields, setFields] = useState({
    code: '',
    nama: '',
    email: '',
    noHP: '',
    alamat: ''
  });
  const [errors, setErrors] = useState({
    code: false,
    nama: false,
    email: false,
    noHP: false
  })
  const [data, setData] = useState([
    {
      id: 'CT-' + Math.random().toString(),
      code: '0792384yf8we932424f',
      nama: 'Rizaldi',
      email: 'test@gmail.com',
      noHP: '08239482340',
      status: 'ACTIVE',
      alamat: ''
    },
    {
      id: 'CT-' + Math.random().toString(),
      code: '07wejwiefje932424f',
      nama: 'Merati',
      email: 'merati@gmail.com',
      noHP: '08937423847',
      status: 'ACTIVE',
      alamat: ''
    },
    {
      id: 'CT-' + Math.random().toString(),
      code: '02373fjfwoiehfw3i4',
      nama: 'Wojak',
      email: 'wojak@gmail.com',
      noHP: '08729820359',
      status: 'ACTIVE',
      alamat: ''
    }
  ]);
  const [selectedId, setSelectedId] = useState(undefined);

  // Event handler
  const closeFormModal = () => {
    resetFields();
    setModalFormStatus(false);
  }
  const handleChange = (key, val) => {
    if (val.length < 4) setErrors({...errors, [key]: true});
    else setErrors({...errors, [key]: false});

    setFields({ ...fields, [key]: val });
  }
  const resetFields = () => {
    Object.keys(fields).forEach(key => {
      fields[key] = '';
      errors[key] = false;
    });
  }

  const showDeleteConfirmation = (id) => {
    setSelectedId(id);
    setModalDeleteStatus(true);
  }
  const closeDeleteModal = () => {
    setSelectedId(undefined);
    setModalDeleteStatus(false);
  }
  const deleteCustomer = () => {
    setData(data.filter(val => val.id !== selectedId));
    closeDeleteModal();
    alert('Data succesfully deleted!');
  };

  const editForm = (id) => {
    setSelectedId(id);
    const selected = data.filter(item => item.id === id);
    setFields({
      code: selected[0].code,
      nama: selected[0].nama,
      email: selected[0].email,
      noHP: selected[0].noHP,
      alamat: selected[0].alamat
    });
    console.log(selected);
    setModalFormStatus(true);
  }

  const validateField = () => {
    let hasError = false;
    Object.keys(fields).forEach(key => {
      if(key !== 'alamat') {
        if (fields[key].length < 4 || errors[key]) {
          errors[key] = true;
          hasError = true;
        }
      }
      
    });

    return !hasError;
  }

  const handleSubmit = () => {
    if (validateField()) {
      if (selectedId) {
        console.log(selectedId);
        const old = data.filter(item => item.id === selectedId);
        const _data = data.filter(val => val.id !== selectedId);
        const temp = {
          id: old[0].id,
          nama: fields.nama,
          code: fields.code,
          email: fields.email,
          status: old[0].status,
          alamat: fields.alamat
        };

        setData([temp, ..._data]);
        setSelectedId(undefined);

        alert('Succesfully updated!');
        setModalFormStatus(false);
        resetFields();
        
        return;
      }
      setData([...data, {
        id: 'CT-' + Math.random().toString(),
        nama: fields.nama,
        code: fields.code,
        email: fields.email,
        status: 'ACTIVE',
        alamat: fields.alamat
      }]);
      alert("Data successfully saved!");
      setModalFormStatus(false);
      resetFields();
      return;
    }

    alert("Please fill up the empty field!");
  }

  const elipsis = text => text.length <= 12 ? text : (text.slice(0, 12) + '...');

  return (
    <>
      <div className="wrapper">
        {/* Sidebar */}
        <nav className="sidebar">
          {/* Sidebar title */}
          <div className="sidebar-container">
            <div className="sidebar-logo">
              <img width="150" src={logo} alt="App logo" draggable="false" />
            </div>

            <div className="sidebar-box__info">
              <span className="d-block mb-1">Team Jarvis</span>
              <span>Development</span>
            </div>
          </div>

          <div className="divider"></div>

          {/* Menus */}
          <div className="sidebar-container">
            <SidebarMenu icon={<PieChartOutlined />} label="Dashboard" />
            <SidebarMenu icon={<FundViewOutlined />} label="Member Journey" />
            <SidebarMenu icon={<AimOutlined />} label="Last Location" />
            <SidebarMenu icon={<ShopOutlined />} label="Customer" />
            <SidebarMenu icon={<FormOutlined />} label="Task" isRoot={true} />
            <SidebarMenu icon={<ControlOutlined />} label="Configuration" isRoot={true} />
            <SidebarMenu icon={<FileTextOutlined />} label="Report" />
            <SidebarMenu icon={<LogoutOutlined />} label="Logout" />
          </div>
        </nav>

        {/* Content */}
        <div className="f-1 container">

          <header className="header">
            <button type="button" className="header-toggler">
              <div className="header-toggler__icon">
                <img src={uk} alt="Region Flag" />
              </div>

              <div className="header-toggler__caret">
                <DownOutlined />
              </div>
            </button>
            <div className="header-profile">
              <div className="header-profile__avatar">
                <span>RP</span>
              </div>

              <span>Rangga Prastio</span>
            </div>
          </header>

          <div className="portlet">

            <h1 className="portlet-title">Customer</h1>
            <div className="portlet-toolbar">
              <div>
                <Button type="primary" label="Add" className="ml-0" onClick={() => setModalFormStatus(true)} />
                <Button type="success" label="Upload" />
              </div>

              <input type="text" placeholder="Search Customer" className="portlet-toolbar__search" />
            </div>

            <div className="portlet-card">
              <div className="portlet-card__toolbar">
                <Button label="Download Template" className="mr-0 m-auto align-right" />
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead className="bg-dark">
                    <tr>
                      <td width="150">No</td>
                      <td width="200">Code</td>
                      <td width="300">Name</td>
                      <td width="200">Email</td>
                      <td width="150">Status</td>
                      <td width="100">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {(data && data.length) && data.map((val, index) => (
                      <tr key={val.id}>
                        <td>{index + 1}</td>
                        <td>{elipsis(val.code)}</td>
                        <td>{val.nama}</td>
                        <td>{val.email}</td>
                        <td>{val.status}</td>
                        <td>
                          <button className="btn-action" onClick={() => editForm(val.id)}>
                            <EditOutlined />
                          </button>
                          <button className="btn-action" onClick={() => showDeleteConfirmation(val.id)}>
                            <DeleteOutlined />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal Form */}
      <div className={`modal ${modalFormStatus ? 'show' : 'hidden'}`}>
        <div className="modal-overlay" onClick={closeFormModal}></div>

        <div className="modal-content">
          <div className="modal-card">
            <div className="modal-card__title modal-card__container">
              <h4>Form Customer</h4>
            </div>

            <div className="modal-card__form modal-card__container">
              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label className={errors.code ? 'text-error' : ''}>Code:</label>
                  <input type="text" className={"form-control" + (errors.code ? ' form-error' : '')} value={fields.code} onChange={(e) => handleChange('code', e.target.value)} />
                  <TextError label="Code field required min 4 characters" status={errors.code} />
                </div>

                <div className="form-group">
                  <label className={errors.nama ? 'text-error' : ''}>Name:</label>
                  <input type="text" className={"form-control" + (errors.nama ? ' form-error' : '')} value={fields.nama} onChange={(e) => handleChange('nama', e.target.value)} />
                  <TextError label="Nama field required min 4 characters" status={errors.nama} />
                </div>

                <div className="form-group">
                  <label className={errors.email ? 'text-error' : ''}>Email:</label>
                  <input type="text" className={"form-control" + (errors.email ? ' form-error' : '')} value={fields.email} onChange={(e) => handleChange('email', e.target.value)} />
                  <TextError label="Email field required min 4 characters" status={errors.email} />
                </div>

                <div className="form-group">
                <label className={errors.noHP ? 'text-error' : ''}>No HP:</label>
                  <input type="text" className={"form-control" + (errors.noHP ? ' form-error' : '')} value={fields.noHP} onChange={(e) => handleChange('noHP', e.target.value)} />
                  <TextError label="No HP field required min 4 characters" status={errors.noHP} />
                </div>

                <div className="form-group">
                  <label>Alamat:</label>
                  <textarea className="form-control" rows="2" value={fields.alamat} onChange={(e) => handleChange('alamat', e.target.value)}></textarea>
                </div>

                <div className="form-group mb-2">
                  <input type="file" />
                </div>
              </form>
            </div>

            <div className="modal-card__footer modal-card__container">
              <Button label="Batal" className="ml-0" onClick={closeFormModal} />
              <Button type="primary" label="Simpan" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      <div className={`modal ${modalDeleteStatus ? 'show' : 'hidden'}`}>
        <div className="modal-overlay" onClick={closeDeleteModal}></div>

        <div className="modal-content">
          <div className="modal-card">
            <div className="modal-card__title modal-card__container">
              <h4>Delete Customer</h4>
            </div>

            <div className="modal-card__form modal-card__container">
              <p>Do you really wish to delete this customer data?</p>
            </div>

            <div className="modal-card__footer modal-card__container">
              <Button label="Cancel" className="ml-0" onClick={closeDeleteModal} />
              <Button type="primary" label="Sure" onClick={deleteCustomer} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarMenu({ icon, label, isRoot = false }) {
  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu__icon">
        {icon}
      </div>
      {
        !isRoot
          ? <span>{label}</span>
          : (
            <div className="sidebar-menu__label">
              <span>{label}</span>
              <DownOutlined />
            </div>
          )
      }

    </div>
  );
}

function TextError({label, status}) {
  return (
    <span className={"text-error" + (status ? ' d-block' : ' d-none')}>
      * {label}.
    </span>
  );
}

export default Customer;