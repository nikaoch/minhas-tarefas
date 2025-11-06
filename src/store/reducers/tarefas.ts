import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Tarefa'
import Tarefa from '../../models/Tarefa'

type TarefasState = {
  itens: Tarefa[]
}

const initialState: TarefasState = {
  itens: [
    {
      id: 1,
      descricao: 'estudar javascript revendo os modulos',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.PENDENTE,
      titulo: 'estudar javascript'
    },
    {
      id: 2,
      descricao: 'estudar typescript praticando',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.CONCLUIDA,
      titulo: 'estudar typescript'
    },
    {
      id: 3,
      descricao: 'estudar react ao vivo',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.PENDENTE,
      titulo: 'estudar react'
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const IndexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (IndexDaTarefa >= 0) {
        state.itens[IndexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )

      if (tarefaJaExiste) {
        alert('Já existe uma tarefa com esse nome!')
      } else {
        const ultimaTarefa = state.itens[state.itens.length - 1]
        const novaTarefa = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(novaTarefa)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const IndexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (IndexDaTarefa >= 0) {
        state.itens[IndexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer
