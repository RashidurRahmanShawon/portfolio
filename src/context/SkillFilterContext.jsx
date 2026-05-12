import React, { createContext, useContext, useState } from 'react';

/**
 * @typedef {object} SkillFilterContextValue
 * @property {string | null} activeSkill
 * @property {(skill: string) => void} toggle
 */

const SkillFilterContext = createContext(
  /** @type {SkillFilterContextValue} */ ({ activeSkill: null, toggle: () => {} })
);

export function SkillFilterProvider({ children }) {
  const [activeSkill, setActiveSkill] = useState(/** @type {string | null} */ (null));

  const toggle = (skill) => setActiveSkill(prev => prev === skill ? null : skill);

  return (
    <SkillFilterContext.Provider value={{ activeSkill, toggle }}>
      {children}
    </SkillFilterContext.Provider>
  );
}

export function useSkillFilter() {
  return useContext(SkillFilterContext);
}