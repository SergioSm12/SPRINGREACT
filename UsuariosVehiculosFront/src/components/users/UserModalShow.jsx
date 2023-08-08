import React, { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/UserModal.css";
export const UserModalShow = () => {
  const { initialUserForm, userSelected, handlerCloseModal } = useUsers();
  const [userModal, setUserModal] = useState(initialUserForm);

  useEffect(() => {
    setUserModal({
      ...userSelected,
      password: "",
    });
  }, [userSelected]);

  const onCloseModal = () => {
    handlerCloseModal();
    setUserModal(initialUserForm);
  };

  return (
    <>
      <div className="abrir-modal animacion fadeIn">
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Show <FontAwesomeIcon icon={faEye} />
                </h5>
                <>
                  {userModal.admin == true && userModal.guard == true ? (
                    <span className="mx-4 badge text-bg-warning">
                      Administrador
                    </span>
                  ) : userModal.admin == true ? (
                    <span className="mx-4 badge text-bg-warning">
                      Administrador
                    </span>
                  ) : userModal.guard == true ? (
                    <span className="mx-4 badge text-bg-danger">
                      Guarda de seguridad
                    </span>
                  ) : (
                    <span className="mx-4 badge text-bg-info">Usuario</span>
                  )}
                </>
                <button
                  onClick={() => onCloseModal()}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      <ul className="list-group text-dark mb-3">
                        <li className="list-group-item active bg-black">
                          {userModal.name} {userModal.lastName}
                        </li>
                        <li className="list-group-item">{userModal.email}</li>
                        <li className="list-group-item">
                          {userModal.faculty.nameFaculty}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => onCloseModal()}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
