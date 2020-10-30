import React, {FC} from 'react';

type Props = {
  accounts: Array<string>;
};

const AccountsList: FC<Props> = ({accounts}) => {
  return (
    <div>
      <ul>
        {accounts?.map((acc) => (
          <li key={acc}>{acc}</li>
        ))}
      </ul>
    </div>
  );
};

export default AccountsList;
