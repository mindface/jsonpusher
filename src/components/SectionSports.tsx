"use client"
import { useState, useMemo } from "react";
import Image from "next/image";
import bicycleImage from "../assets/images/bicycle.jpg";

import { Ccheck } from "../stories/Ccheck/Ccheck";
import { Button } from "../stories/Button/Button";
import { InputRange } from "../stories/InputRange/InputRange";
import { Textarea } from "../stories/TextArea/Textarea";
import { Title3h } from "../stories/title3h/Title3h";
import { Dialog } from "../stories/Dialog/Dialog";

import SelectPartList from "../json/selectPartList.json";
import SelectSportsPatternList from "../json/selectSportsPatternList.json";
import SelectSportsList from "../json/selectSportsList.json";
import SelectLevelList from "../json/selectLevelList.json";

type SelectItem = {
  check: boolean,
  label: string,
  id?: string,
  settingsLevel?: number,
};

type SelectSportsPatternItem = {
  categoryId: string,
  categoryLabel: string,
  list: SelectItem[],
};

export default function SectionSports() {
  const [viewTextSwitch,viewTextSwitchSet] = useState(false);
  const [selectParts,selectPartsSet] = useState<SelectItem[]>([]);
  const [selectPattern,selectPatternSet] = useState<SelectItem[]>([]);
  const [selectLevel,selectLevelSet] = useState<SelectItem[]>([]);
  const [selectSports,selectSportsSet] = useState<SelectItem[]>([]);
  const [userLevel,userLevelSet] = useState(0);
  
  const selectPartList = SelectPartList;
  const selectSportsPatternList = SelectSportsPatternList;
  const selectLevelList = SelectLevelList;
  const selectSportsList = SelectSportsList;

  const checking = (list:SelectItem[], name: string) => {
    return list.some((item:SelectItem) => item.label === name);
  }

  const keyWord = (setAi?: string) => {
    let setText = "";
    selectSports.forEach((item) => {
      setText += item.label + " ";
    });
    if(selectSports.length > 0 && setAi) {
      setText += "カテゴリの";
    }
    selectParts.forEach((item) => {
      setText += item.label + " ";
    });
    setText += "に関して";
    selectPattern.forEach((item) => {
      setText += item.label + " ";
    });
    if(selectPattern.length > 0 && setAi) {
      setText += "について";
    }
    selectLevel.forEach((item) => {
      setText += item.label;
    });
    if(selectLevel.length > 0 && setAi) {
      setText += "で教えてください。";
    }
    return setText;
  } 

  const changingParts = (check:boolean,label:string) => {
    if(check && !checking(selectParts,label)) {
      selectPartsSet([...selectParts, { check, label }])
    }else {
      const list = selectParts.filter((item) => item.label !== label);
      selectPartsSet(list);
    }
  }

  const changingPattern = (check:boolean,label:string) => {
    if(check && !checking(selectPattern,label)) {
      selectPatternSet([...selectPattern, { check, label }])
    }else {
      const list = selectPattern.filter((item) => item.label !== label);
      selectPatternSet(list);
    }
  }

  const changingLevel = (check:boolean,label:string) => {
    if(check && !checking(selectLevel,label)) {
      selectLevelSet([...selectLevel, { check, label }])
    }else {
      const list = selectLevel.filter((item) => item.label !== label);
      selectLevelSet(list);
    }
  }

  const changingSports = (check:boolean,label:string, id:string) => {
    if(check && !checking(selectSports,label)) {
      selectSportsSet([...selectSports, { check, label, id }])
    }else {
      const list = selectSports.filter((item) => item.label !== label);
      selectSportsSet(list);
    }
  }

  const copyAciton = () => {
    let copyText = keyWord("ai");
    navigator.clipboard.writeText(copyText).then(() => {
      alert("コピーしました。");
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  }

  const googlSearchAction = () => {
    let searchText = keyWord();
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
    window.open(url, '_blank'); 
  }

  const selectSportsPatternListForLevel = useMemo(() => {
    const list = selectSportsPatternList.map((item) => {
      return {...item, list: item.list?.filter((categoryItem) => {
        // ユーザーのレベル以下であれば表示させない
        if(categoryItem.settingsLevel < userLevel) {
          return item;
        }
      })};
    });
    return list as SelectSportsPatternItem[];
  },[userLevel]);

  return (
    <section className="section-health">
      <div className="flex justify-center">
        <Image
          src={bicycleImage}
          className="rounded-lg"
          width={300}
          height={300}
          alt="health image"
          loading="lazy"
          style={{ objectFit: 'cover' }}
        />
        {viewTextSwitch && <Textarea value={keyWord("ai")} />}
      </div>
      <Dialog label="スポーツ項目を選択する">
        <div className="category-box--outer flex justify-center">
          {selectSportsList.map((categoryItem) => <div className="category-box p-2" key={categoryItem.categoryId}>
            <h3 className="category-box__title">{categoryItem.categoryName}</h3>
            <ul className="select-type">
            {categoryItem.type.map((typeItem) => 
              <li className="p-2" key={typeItem.id}>
                <Ccheck
                  partsId={typeItem.id}
                  size="small"
                  label={typeItem.label}
                  changing={(check) => changingSports(check, typeItem.label, typeItem.id)}
                />
              </li>)}
            </ul>
          </div>)}
        </div>
      </Dialog>
      <div className="select-sports-box flex pt-4">
        {selectSports.map((selectSports) => <span className="inline-block mr-2 p-2 rounded-full border border-blue-400" key={`select${selectSports.id}`}>{selectSports.label}</span>)}
      </div>
      <div className="select-box flex pt-4">
        <ul className="select-parts">
          {selectPartList.map((item) => 
            <li className="p-2" key={item.id}>
              <Ccheck
                partsId={item.id}
                size="small"
                primary={true}
                label={item.label}
                changing={(check) => changingParts(check, item.label)}
              />
            </li>
          )}
        </ul>
        <ul className="select-pattern">
          <li className="p-2">
            <p className="caption">自身のレベル</p>
            <div className="relative inline-flex p-2">
              <div className="absolute top-0 -right-2">
                <Dialog label="?">
                  <p>この設計の詳細について</p>
                  <p>レベルが低い場合は経験値がなくても利用できるケースを示しています。</p>
                </Dialog>
              </div>
              <InputRange
                onChange={(value) => {
                  userLevelSet(Number(value))
                }}
              />
              {userLevel}
            </div>
          </li>
          {selectSportsPatternListForLevel.map((categoryItem) => 
            <li className="p-2" key={categoryItem.categoryId}>
              <Title3h title={categoryItem.categoryLabel} />
              <ul className="level-list">
                {categoryItem.list.map((levelItem) => 
                  <li className="level-item pb-2" key={levelItem.id}>
                    <Ccheck
                      partsId={levelItem.id ?? ""}
                      size="small"
                      label={levelItem.label}
                      changing={(check) => changingPattern(check, levelItem.label)}
                    />
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
        <ul className="select-level">
          {selectLevelList.map((item) => 
            <li className="p-2" key={item.id}>
              <Ccheck
                partsId={item.id}
                size="small"
                label={item.label}
                changing={(check) => changingLevel(check, item.label)}
              />
            </li>
          )}
        </ul>
      </div>
      <div className="flex justify-end pb-2">
        <Ccheck
          partsId={"viewTextSwitch"}
          size="small"
          primary={true}
          label={"コピーするテキストの確認"}
          changing={(check) => viewTextSwitchSet(check)}
        />
      </div>
      <div className="flex justify-end">
        <Button label="copy" size="small" onClick={copyAciton} />
        <Button label="google search" size="small" onClick={googlSearchAction} />
      </div>
    </section>
  );
}
