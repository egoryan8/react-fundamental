import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        placeholder="Поиск..."
        value={filter.searchValue}
        onChange={(e) => setFilter({ ...filter, searchValue: e.target.value })}
      />
      <MySelect
        value={filter.sort}
        onChange={(sort) => setFilter({ ...filter, sort: sort })}
        defaultValue="Сортировка по"
        options={[
          { value: 'title', name: 'заголовку' },
          { value: 'body', name: 'описанию' },
        ]}
      />
    </div>
  );
};

export default PostFilter;
