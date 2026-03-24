import React from 'react';
import TextInput from '../ui/TextInput';
import TextArea from '../ui/TextArea';
import TagInput from '../ui/TagInput';
import AddMoreGroup from '../ui/AddMoreGroup';

export default function Step3Topics({ data, onChange, errors }) {
  const topics = data.topics || [{ title: '', takeaways: '', tags: [] }];

  const updateTopic = (index, field, value) => {
    const newTopics = [...topics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    onChange({ ...data, topics: newTopics });
  };

  const addTopic = () => {
    if (topics.length < 3) {
      onChange({ ...data, topics: [...topics, { title: '', takeaways: '', tags: [] }] });
    }
  };

  const removeTopic = (index) => {
    if (topics.length > 1) {
      const newTopics = topics.filter((_, i) => i !== index);
      onChange({ ...data, topics: newTopics });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif italic text-4xl md:text-5xl text-primary mb-1">Hva snakker du om?</h1>
        <p className="font-mono text-xs text-primary/40 uppercase tracking-widest mt-2">
          Legg inn opptil 3 foredragstemaer. Minst ett er påkrevd.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {topics.map((topic, index) => (
          <div key={index} className="relative flex flex-col gap-6 p-8 rounded-3xl bg-surface/5 border border-primary/10">
            {index > 0 && (
              <button
                onClick={() => removeTopic(index)}
                className="absolute top-4 right-4 text-primary/30 hover:text-accent font-mono text-[10px] uppercase tracking-widest"
              >
                [ Fjern ]
              </button>
            )}
            
            <TextInput
              label={`Tittel på tema #${index + 1}`}
              required
              placeholder="F.eks. Fremtidens lederskap"
              value={topic.title || ''}
              onChange={(e) => updateTopic(index, 'title', e.target.value)}
            />

            <TextArea
              label="Hva sitter publikum igjen med?"
              required
              placeholder="Deltakerne forstår..."
              hint="Start med «Deltakerne forstår...»"
              value={topic.takeaways || ''}
              onChange={(e) => updateTopic(index, 'takeaways', e.target.value)}
            />

            <TagInput
              label="Stikkord"
              max={4}
              suggestions={['Endring', 'Ledelse', 'Motivasjon', 'Innovasjon', 'Salg', 'Bærekraft']}
              tags={topic.tags || []}
              onChange={(tags) => updateTopic(index, 'tags', tags)}
            />
          </div>
        ))}
      </div>

      {topics.length < 3 && (
        <AddMoreGroup
          label="Legg til et foredragstema"
          onClick={addTopic}
        />
      )}
      
      {errors?.topics && <p className="text-accent text-sm font-mono mt-2">{errors.topics}</p>}
    </div>
  );
}
