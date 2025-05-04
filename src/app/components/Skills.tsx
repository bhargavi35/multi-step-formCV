import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { skillSchema } from '../utils/validationSchemas';
import { Skill } from '../context/FormContext';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const Skills: React.FC = () => {
  const { formState, setFormState, nextStep, prevStep } = useFormContext();
  const [isAdding, setIsAdding] = useState(false);

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = {
      ...skill,
      id: Date.now().toString(),
    };

    setFormState(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    setIsAdding(false);
  };

  const removeSkill = (id: string) => {
    setFormState(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(formState.skills);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormState(prev => ({
      ...prev,
      skills: items
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="skills" >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4 mb-6"
            >
              {formState.skills.length === 0 && !isAdding && (
                <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">No skills added yet. Add your first skill below.</p>
                </div>
              )}

              {formState.skills.map((skill, index) => (
                <Draggable key={skill.id} draggableId={skill.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                        </svg>
                        <div>
                          <p className="font-medium">{skill.name}</p>
                          <p className="text-sm text-gray-600">{skill.level}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isAdding ? (
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <Formik
            initialValues={{ name: '', level: 'Beginner' }}
            validationSchema={skillSchema}
            onSubmit={addSkill}
          >
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., JavaScript, Python, etc."
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <Field
                  as="select"
                  id="level"
                  name="level"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </Field>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Add Skill
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center text-orange-500 border border-orange-500 px-4 py-2 rounded-md hover:bg-orange-50 transition-colors mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Skill
        </button>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Back
        </button>

        <button
          onClick={nextStep}
          className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Skills;
