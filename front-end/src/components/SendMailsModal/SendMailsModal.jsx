import { useState } from "react";
import updateUser from "../../requests/update_user.js";

import "./SendMailsModal.css";

export default function SendMailsModal({ modified_users, set_modified_users, set_users, dialog_ref }) {
  return (
    <dialog
      className="send_mails_dialog"
      ref={dialog_ref}
    >
      <form className="send_mails_form" method="dialog">
        <h3 className="send_mails_title">Vous vous apprêter à notifier: </h3>

        <ul className="send_mails_users">
          {modified_users.map(user => {
            return <li key={user.firm_name} className="send_mails_user">{user.firm_name}</li>;
          })}
        </ul>

        <div className="send_mails_buttons">
          <button className="send_mails_button send_mails_cancel">
            Annuler
          </button>

          <button
            className="send_mails_button send_mails_confirm"
            onClick={(e) => {
              if (e.button != 0) {
                return;
              }

              modified_users.forEach(user => {
                updateUser(user.firm_name, { has_mail: user.unstaged_has_mail })
                  .then(success => {
                    if (success) {
                      set_users(prev => {
                        prev.find(e => e.firm_name == user.firm_name).has_mail = user.unstaged_has_mail;
                        return prev;
                      });
                    }
                  });
              });
              set_modified_users([]);
            }}
          >
            Envoyer
          </button>
        </div>
      </form>
    </dialog>
  );
}

